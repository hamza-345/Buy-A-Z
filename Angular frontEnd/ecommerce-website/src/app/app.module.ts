import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ProductService } from './services/product.service';
import { Routes, RouterModule, Router } from '@angular/router';
import { ProductListMenuComponent } from './components/product-list-menu/product-list-menu.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import oktaConfig from './config/okta-config';
import { OktaAuth } from '@okta/okta-auth-js';
import { OktaAuthGuard, OktaAuthModule, OktaCallbackComponent, OKTA_CONFIG } from '@okta/okta-angular';
import { MemberComponent } from './components/member/member.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AuthInterceptor } from './models/auth-interceptor';
import { CreateAccountComponent } from './components/create-account/create-account.component';


const config = oktaConfig.oidc
const oktaAuth = new OktaAuth(config)

function onAuthRequired(oktaAuth: OktaAuth, injector: Injector) {
  const router = injector.get(Router);

  // Redirect the user to your custom login page
  router.navigate(['/login']);
}


const routes: Routes = [
  {
    path: 'order-history', component: OrderHistoryComponent, canActivate: [OktaAuthGuard], data: {
      onAuthRequired: onAuthRequired
    }
  },
  {
    path: 'members', component: MemberComponent, canActivate: [OktaAuthGuard], data: {
      onAuthRequired: onAuthRequired
    }
  },
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'login', component: LoginComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "cart-details", component: CartDetailsComponent },
  { path: "products/:id", component: ProductDetailsComponent },
  { path: "search/:keyword", component: ProductListComponent },
  { path: "category/:id", component: ProductListComponent },
  { path: "category/", component: ProductListComponent },
  { path: "category/:id", component: ProductListComponent },
  { path: "products", component: ProductListComponent },
  { path: "**", redirectTo: "/products" }
]

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductListMenuComponent,
    ProductSearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    MemberComponent,
    OrderHistoryComponent,
    CreateAccountComponent
  ],
  imports: [
    NgbModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [ProductService, { provide: OKTA_CONFIG, useValue: { oktaAuth } }, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }

