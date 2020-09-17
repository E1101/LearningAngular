/**
 * Provides a `Product` object
 */
export class Product {
  // When we write public sku: string, we’re saying two things:
  // • there is a public variable on instances of this class called sku
  // • sku is of type string.
  constructor(
    public sku: string,
    public name: string,
    public imageUrl: string,
    public department: string[],
    public price: number
  ) { }
}
