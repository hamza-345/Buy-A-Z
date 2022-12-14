import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';
import oktaConfig from 'src/app/config/okta-config';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  oktaSignIn: any
  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    this.oktaSignIn = new OktaSignIn(
      {
        baseUrl: oktaConfig.oidc.issuer.split('/oauth2')[0],
        clientId: oktaConfig.oidc.clientId,
        redirectUri: oktaConfig.oidc.redirectUri,
        authParams: {
          pkce: true,
          issuer: oktaConfig.oidc.issuer,
          scopes: oktaConfig.oidc.scopes
        }
      }
    )
  }

  ngOnInit(): void {
    this.oktaSignIn.remove();

    this.oktaSignIn.renderEl({
      el: '#okta-sign-in-widget'
    },
      async (response: any) => {
        if (response.status === 'SUCCESS') {
          await this.oktaAuth.signInWithRedirect()
        }
      },
      (error: any) => {
        throw error;
      }
    )
  }

}
