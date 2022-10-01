import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderHistory } from '../models/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  getOrderHistory(email: string) {

    let url = `http://localhost:8080/api/orders/search/findByCustomerEmail?email=${email}&sort=dateCreated,DESC`
    console.log(url)
    return this.httpClient.get<OrdersResponse>(url);
  }
}

interface OrdersResponse {
  _embedded: {
    orders: OrderHistory[]
  }
}