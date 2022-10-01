import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderHistory } from 'src/app/models/order-history';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orderList: OrderHistory[] = []
  storage = localStorage

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderDetails()
  }

  orderDetails() {
    let email = JSON.parse(this.storage.getItem('email')!)


    this.orderService.getOrderHistory(email).subscribe(data => {
      this.orderList = data._embedded.orders
      console.log(this.orderList)
    })
  }
}
