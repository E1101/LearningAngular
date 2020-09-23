// when writing our apps there are three steps we need to take in order to perform an injection:
// 1. Create the dependency (e.g. the service class)
// 2. Configure the injection(i.e.register the injection with Angular in our NgModule)
// 3. Declare the dependencies on the receiving component
import {
  Component,
  Inject
} from '@angular/core';
import { Router } from '@angular/router';
import { ExampleDef } from './example.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private router: Router,
    @Inject('ExampleDefs') public examples: ExampleDef[]) {
  }
}
