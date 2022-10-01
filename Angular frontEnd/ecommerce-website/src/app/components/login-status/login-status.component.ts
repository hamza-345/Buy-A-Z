import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false
  userFullName: string = ''
  storage = localStorage

  constructor(private oktaAuthService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe((result) => {
      this.isAuthenticated = result.isAuthenticated!;
      this.getUserDetails();
    })
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      this.oktaAuth.getUser().then(
        (res: any) => {
          console.log(res)
          this.userFullName = res.name as string
          let email = res.email as string
          let firstName = res.given_name
          let lastName = res.family_name
          this.storage.setItem('email', JSON.stringify(email))
          this.storage.setItem('firstName', JSON.stringify(firstName))
          this.storage.setItem('lastName', JSON.stringify(lastName))
        }
      )
    }
  }
  logOut() {
    this.oktaAuth.signOut()
  }
}
