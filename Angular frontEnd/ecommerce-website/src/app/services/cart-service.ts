import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = []
  totalPrice: Subject<number> = new BehaviorSubject<number>(0)
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0)
  storage = localStorage

  constructor() {
    const items = JSON.parse(this.storage.getItem('cartItems')!)
    if (items != null) {
      this.cartItems = items
      this.calculate()
    }
  }

  addProduct(cartItem: CartItem) {
    let existingItem = this.cartItems.find(tempProduct => tempProduct.id === cartItem.id)!
    let exists = (existingItem != undefined)
    if (exists) {
      existingItem.quantity = existingItem.quantity + 1;
    }
    else {
      this.cartItems.push(cartItem)
    }
    this.calculate()
  }

  calculate() {
    let totalPrice: number = 0.00;
    let totalQuantity: number = 0;

    for (let tempItem of this.cartItems) {
      totalPrice += tempItem.unitPrice * tempItem.quantity
      totalQuantity += tempItem.quantity
    }
    this.totalPrice.next(totalPrice)
    this.totalQuantity.next(totalQuantity)

    this.persistItems()
  }

  persistItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems))
  }

  removeProduct(tempProduct: CartItem) {
    tempProduct.quantity--;
    if (tempProduct.quantity == 0) {
      this.remove(tempProduct)
    }
    else {
      this.calculate()
    }
  }

  remove(theTempProduct: CartItem) {
    let removeId = this.cartItems.findIndex(tempProduct => tempProduct.id === theTempProduct.id)
    this.cartItems.splice(removeId, 1)
    this.calculate()
  }
}
