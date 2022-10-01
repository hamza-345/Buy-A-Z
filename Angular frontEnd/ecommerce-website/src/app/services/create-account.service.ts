import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateAccountDTO } from '../models/create-account-dto';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {

  constructor(private httpClient: HttpClient) { }

  createAccount(customer: CreateAccountDTO): Observable<any> {
    let url = 'https://dev-04075579.okta.com/api/v1/users?activate=true'
    const headers = new HttpHeaders().set("Authorization", "SSWS 00bheR3AW7PrTt8xD52o-yi0WleYXQaqKKm8zbhUzg").set('content-type', 'application/json')
    return this.httpClient.post<CreateAccountDTO>(url, customer, { headers: headers })
  }
}
