import Product from "../domain/product.entity";

export default interface ProductGateway {
  add(entity: Product): Promise<void>;
  findAll(): Promise<Product[]>;
  find(id: string): Promise<Product>;
}