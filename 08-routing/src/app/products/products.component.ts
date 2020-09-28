import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent
{
  id: string;

  // In order to use route parameters, we need ActivatedRoute
  // For example, let’s say we have a Routes that specifies the following:
  // const routes: Routes = [
  //  { path: 'product/:id', component: ProductComponent }
  // ];
  constructor(private router: Router, private route: ActivatedRoute)
  {
    // Notice that route.params is an observable. We can extract the value of the param -
    // into a hard value by using .subscribe. In this case, we assign the value of -
    // params['id'] to the id instance variable on the component.
    route.params.subscribe(params => { this.id = params['id']; });
  }

  goToProduct(id: string): void
  {
    this.router.navigate(['./', id], {relativeTo: this.route});
  }
}
