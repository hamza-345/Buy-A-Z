import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateAccountDTO } from 'src/app/models/create-account-dto';
import { CreateCustomer } from 'src/app/models/create-customer';
import { Credentials } from 'src/app/models/credentials';
import { CustomValidators } from 'src/app/models/custom-validators';
import { Password } from 'src/app/models/password';
import { CreateAccountService } from 'src/app/services/create-account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  createUserFormGroup!: FormGroup

  constructor(private formBuilder: FormBuilder, private createAccount: CreateAccountService) { }

  ngOnInit(): void {
    this.createUserFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl("", [Validators.required, Validators.minLength(2), CustomValidators.noWhiteSpace]),
        lastName: new FormControl("", [Validators.required, Validators.minLength(2), CustomValidators.noWhiteSpace]),
        email: new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        password: new FormControl("", [Validators.required, Validators.minLength(2)])
      })
    })
  }

  get firstName() { return this.createUserFormGroup.get("customer.firstName") }
  get lastName() { return this.createUserFormGroup.get("customer.lastName") }
  get email() { return this.createUserFormGroup.get("customer.email") }
  get password() { return this.createUserFormGroup.get("customer.password") }

  submitForm() {
    if (this.createUserFormGroup.invalid) {
      this.createUserFormGroup.markAllAsTouched()
    }
    else {
      this.submit()
      this.createUserFormGroup.reset()
    }
  }
  submit() {
    let createCustomer = new CreateCustomer(this.createUserFormGroup.controls['customer'].value)
    let password = new Password(this.createUserFormGroup.controls['customer'].value.password)
    let credentials = new Credentials(password)
    let createAccountDTO = new CreateAccountDTO(createCustomer, credentials)
    console.log(createAccountDTO)
    this.createAccount.createAccount(createAccountDTO).subscribe(data => {
      alert("Your account has been created")
    })
  }

}
