import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart-service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = []
  totalPrice: number = 0.0
  totalQuantity: number = 0.0

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.cartItems
    this.cartService.totalPrice.subscribe(data => {
      this.totalPrice = data
    })

    this.cartService.totalQuantity.subscribe(data => {
      this.totalQuantity = data
    })
  }

  addToCart(tempProduct: CartItem) {
    this.cartService.addProduct(tempProduct)
  }

  decrement(tempProduct: CartItem) {
    this.cartService.removeProduct(tempProduct)
  }

  remove(tempProduct: CartItem) {
    this.cartService.remove(tempProduct)
  }
}
