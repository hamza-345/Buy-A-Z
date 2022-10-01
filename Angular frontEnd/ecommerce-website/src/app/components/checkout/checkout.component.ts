import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { Address } from 'src/app/models/address';
import { CustomValidators } from 'src/app/models/custom-validators';
import { Customer } from 'src/app/models/customer';
import { Order } from 'src/app/models/order';
import { OrderItem } from 'src/app/models/order-item';
import { Purchase } from 'src/app/models/purchase';
import { CartService } from 'src/app/services/cart-service';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup
  totalQuantity: number = 0
  totalPrice: number = 0;
  provinces: string[] = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon Territory']
  month: number = new Date().getMonth() + 1
  months: number[] = []
  years: number[] = []
  isAuthenticated: boolean = false
  thefirstName: string = ''
  thelastName: string = ""
  theemail: string = ''
  storage = localStorage

  constructor(private oktaAuthService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private formBuilder: FormBuilder, private checkoutService: CheckoutService, private cartService: CartService) {
    this.thefirstName = JSON.parse(this.storage.getItem('firstName')!)
    this.thelastName = JSON.parse(this.storage.getItem('lastName')!)
    this.theemail = JSON.parse(this.storage.getItem('email')!)
  }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl("", [Validators.required, Validators.minLength(2), CustomValidators.noWhiteSpace]),
        lastName: new FormControl("", [Validators.required, Validators.minLength(2), CustomValidators.noWhiteSpace]),
        email: new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl("", [Validators.required, Validators.minLength(2), CustomValidators.noWhiteSpace]),
        city: new FormControl("", [Validators.required, Validators.minLength(2), CustomValidators.noWhiteSpace]),
        province: new FormControl(""),
        country: new FormControl("", [Validators.required]),
        postalCode: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z][0-9][a-zA-Z][ -]?[0-9][a-zA-Z][0-9]$")])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl("", [Validators.required, Validators.minLength(2), CustomValidators.noWhiteSpace]),
        city: new FormControl("", [Validators.required, Validators.minLength(2), CustomValidators.noWhiteSpace]),
        province: new FormControl(""),
        country: new FormControl("", [Validators.required]),
        postalCode: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z][0-9][a-zA-Z][ -]?[0-9][a-zA-Z][0-9]$")])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl("", [Validators.required]),
        nameOnCard: new FormControl("", [Validators.required, Validators.minLength(2), CustomValidators.noWhiteSpace]),
        cardNumber: new FormControl("", [Validators.required, Validators.pattern("^([0-9]{4}[\s-]?){3}([0-9]{4})$")]),
        securityCode: new FormControl("", [Validators.required, Validators.pattern("[0-9]{3}")]),
        expirationMonth: [''],
        expirationYear: ['']
      })
    })

    this.checkoutService.getMonths(this.month).subscribe(data => {
      this.months = data
    })

    this.checkoutService.getYears().subscribe(data => {
      this.years = data
    })

    this.reviewCartDetails();


  }



  get firstName() { return this.checkoutFormGroup.get("customer.firstName") }
  get lastName() { return this.checkoutFormGroup.get("customer.lastName") }
  get email() { return this.checkoutFormGroup.get("customer.email") }
  get shippingAddressStreet() { return this.checkoutFormGroup.get("shippingAddress.street") }
  get shippingAddressCity() { return this.checkoutFormGroup.get("shippingAddress.city") }
  get shippingAddressProvince() { return this.checkoutFormGroup.get("shippingAddress.province") }
  get shippingAddressCountry() { return this.checkoutFormGroup.get("shippingAddress.country") }
  get shippingAddressPostalCode() { return this.checkoutFormGroup.get("shippingAddress.postalCode") }
  get billingAddressStreet() { return this.checkoutFormGroup.get("billingAddress.street") }
  get billingAddressCity() { return this.checkoutFormGroup.get("billingAddress.city") }
  get billingAddressProvince() { return this.checkoutFormGroup.get("billingAddress.province") }
  get billingAddressCountry() { return this.checkoutFormGroup.get("billingAddress.country") }
  get billingAddressPostalCode() { return this.checkoutFormGroup.get("billingAddress.postalCode") }
  get cardType() { return this.checkoutFormGroup.get("creditCard.cardType") }
  get nameOnCard() { return this.checkoutFormGroup.get("creditCard.nameOnCard") }
  get cardNumber() { return this.checkoutFormGroup.get("creditCard.cardNumber") }
  get securityCode() { return this.checkoutFormGroup.get("creditCard.securityCode") }
  submitForm() {
    console.log(this.checkoutFormGroup.value);
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched()
    }
    else {
      this.submit()
      this.checkoutFormGroup.reset()
    }
  }

  submit() {
    console.log(`customer: ${this.checkoutFormGroup.controls['customer'].value}`)
    let customer: Customer = this.checkoutFormGroup.controls['customer'].value
    let shippingAddress: Address = this.checkoutFormGroup.controls['shippingAddress'].value
    let billingAddress: Address = this.checkoutFormGroup.controls['billingAddress'].value
    let orderItems: OrderItem[] = this.cartService.cartItems.map(item => new OrderItem(item))
    let order: Order = new Order(this.totalQuantity, this.totalPrice)
    let purchase: Purchase = new Purchase(customer, shippingAddress, billingAddress, order, orderItems)
    console.log(`Purchase: ${purchase}`)
    this.checkoutService.checkout(purchase).subscribe(data => {
      alert(`Your tracking number is ${data.orderTrackingNumber}. Please create an account with same email address to track your order`)
      this.cartService.cartItems = []
      this.cartService.calculate()
    })

  }

  sameAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.get("billingAddress")?.setValue(this.checkoutFormGroup.value.shippingAddress)
    }
    else {
      this.checkoutFormGroup.get("billingAddress")?.reset()
    }
  }

  changeMonths() {
    if (this.checkoutFormGroup.get("creditCard")?.value.expirationYear != new Date().getFullYear()) {
      this.month = 1;
      this.checkoutService.getMonths(this.month).subscribe(data => {
        this.months = data
      })
    }
    else {
      this.month = new Date().getMonth() + 1;
      this.checkoutService.getMonths(this.month).subscribe(data => {
        this.months = data
      })
    }

  }

  reviewCartDetails() {
    this.cartService.totalPrice.subscribe(data => {
      this.totalPrice = data
    })

    this.cartService.totalQuantity.subscribe(data => {
      this.totalQuantity = data
    })
  }

}
