import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { UserItemComponent } from './user-item/user-item.component';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  // declarations specifies the components.
  // You have to declare components in a NgModule -
  // before you can use them in your templates.
  declarations: [
    AppComponent,
    HelloWorldComponent,
    UserItemComponent,
    UserListComponent
  ],
  // imports describes which dependencies this module has.
  // you put something in your NgModule’s imports if you’re going -
  // to be using it in your templates or with dependency injection.
  imports: [
    BrowserModule
  ],
  // providers is used for dependency injection.
  // So to make a service available to be injected throughout our -
  // application, we will add it here.
  providers: [],
  // bootstrap tells Angular that when this module is used to bootstrap -
  // an app, we need to load the AppComponent component as the top-level component.
  bootstrap: [AppComponent]
})
export class AppModule { }
