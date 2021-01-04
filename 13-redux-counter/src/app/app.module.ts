import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { appStoreProviders } from './app.store';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  // when we want to make something available via DI,
  // then we use the providers configuration to add it
  // to the list of providers in our NgModule.
  // --
  // Notice that we exported the function appStoreProviders
  // from app.store.ts and then used that function in providers.
  // Why not use the { provide: ..., useFactory: ... } syntax directly?
  // The answer is related to AOT - if we want to ahead-of-time compile
  // a provider that uses a function, we must first export is as a function
  // from another module.
  providers: [ appStoreProviders ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
