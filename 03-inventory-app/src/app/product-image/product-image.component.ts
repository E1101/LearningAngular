import {
  Component,
  Input,
  HostBinding
} from '@angular/core';
import { Product } from '../product.model';

/**
 * @ProductImage: A component to show a single Product's image
 */
@Component({
  selector: 'product-image',
  // we’re telling Angular that we want to use the [src] input on this img tag.
  // Angular will then replace the value of the src attribute once the expression is resolved.
  // We could also have written this tag this way:
  // <img src="{{ product.imageUrl }}">
  template: `
  <img class="product-image" [src]="product.imageUrl">
  `
})
export class ProductImageComponent {
  @Input() product: Product;
  @HostBinding('attr.class') cssClass = 'ui small image';
}
