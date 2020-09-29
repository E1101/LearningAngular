import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';    // <-- routes

import { routes as childRoutes, ProductsModule } from './products/products.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { ProtectedComponent } from './protected/protected.component';
import { ProductsComponent } from './products/products.component';

import { AUTH_PROVIDERS } from './auth.service';
import { LoggedInGuard } from './logged-in.guard';

// To use the routes in our app we do two things to our NgModule:
//  1. Import the RouterModule
//  2. Install the routes using RouterModule.forRoot(routes) in the imports of our NgModule
//

// we declare the routes creating an array of objects that conform to the Routes type
const routes: Routes = [
  // basic routes
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'contactus', redirectTo: 'contact' },
  // authentication demo
  { path: 'login', component: LoginComponent },
  {
    path: 'protected',
    component: ProtectedComponent,
    // We want this component to only be accessible to logged in users.
    canActivate: [ LoggedInGuard ]
  },
  // nested
  {
    path: 'products',
    component: ProductsComponent,
    children: childRoutes
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    LoginComponent,
    ProtectedComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes), // <-- routes
    // added this for our child module
    ProductsModule
  ],
  providers: [
    // (i) You could write your own strategy if you wanted to. All you need to do is -
    // extend the LocationStrategy class and implement the methods. A good way to start -
    // is reading the Angular source for the HashLocationStrategy or PathLocationStrategy classes.

    // uncomment this for "hash-bang" routing
    // { provide: LocationStrategy, useClass: HashLocationStrategy }

    // You can declare the application base path programmatically,
    // when configuring our NgModule by using the APP_BASE_HREF provider.
    // --
    // It is the equivalent of using <base href="/"> on our application HTML header.
    // { provide: APP_BASE_HREF, useValue: '/' },

    AUTH_PROVIDERS,
    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
