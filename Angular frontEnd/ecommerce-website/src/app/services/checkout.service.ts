import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Purchase } from '../models/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private httpClient: HttpClient) { }

  getMonths(month: number): Observable<number[]> {
    let months: number[] = []
    for (let start = month; start <= 12; start++) {
      months.push(start)
    }
    return of(months)
  }

  getYears(): Observable<number[]> {
    let years: number[] = []
    let start;
    for (start = new Date().getFullYear(); start <= new Date().getFullYear() + 10; start++) {
      years.push(start)
    }
    return of(years)
  }

  checkout(purchase: Purchase): Observable<any> {
    let url = 'http://localhost:8080/api/checkout/purchase'
    return this.httpClient.post<Purchase>(url, purchase)
  }
}
