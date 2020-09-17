import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Product } from '../product.model';

/**
 * @ProductsList: A component for rendering all ProductRows and
 * storing the currently selected Product
 */
@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent {
  /**
   * @input productList - the Product[] passed to us
   */
  // If we need to use two different names for the attribute and the property,
  // we could for example write @Input('firstname') name: String;
  // But the Angular Style Guide suggests to avoid this.
  @Input() productList: Product[];

  /**
   * @output onProductSelected - outputs the current
   *          Product whenever a new Product is selected
   */
  // Here’s a short and sweet example of how you can use EventEmitter
  // let ee = new EventEmitter();
  // ee.subscribe((name: string);
  // console.log(Hello ${name}));
  // ee.emit(“Nate”);
  // // -> “Hello Nate”
  @Output() onProductSelected: EventEmitter<Product>;

  /**
   * @property currentProduct - local state containing
   *             the currently selected `Product`
   */
  private currentProduct: Product;

  constructor() {
    this.onProductSelected = new EventEmitter();
  }

  clicked(product: Product): void {
    this.currentProduct = product;
    // Emit the Product that was clicked on our output
    this.onProductSelected.emit(product);
  }

  isSelected(product: Product): boolean {
    if (!product || !this.currentProduct) {
      return false;
    }
    return product.sku === this.currentProduct.sku;
  }

}
