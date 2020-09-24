import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-simple-http',
  templateUrl: './simple-http.component.html'
})
export class SimpleHttpComponent {
  data: Object;
  loading: boolean;

  // In our NgModule we will add HttpClientModule to the list of imports.
  // The effect is that we will be able to inject HttpClient
  constructor(private http: HttpClient) {}

  makeRequest(): void {
    this.loading = true;
    // .subscribe can also handle failures and stream completion by passing a function -
    // to the second and third arguments respectively. In a production app it would be a -
    // good idea to handle those cases, too. That is, this.loading should also be set to -
    // false if the request fails (i.e. the stream emits an error).
    this.http.get('https://jsonplaceholder.typicode.com/posts/1')
      .subscribe(data => {
        this.data = data;
        this.loading = false;
      });
  }
}
