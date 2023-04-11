import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { AddStoreCatalogInputDto } from "./add-product.dto";

export default class AddProductUseCase {
    constructor(private readonly productRepository: ProductGateway) { }

    async execute(input: AddStoreCatalogInputDto): Promise<void> {
        const entity = new Product({
            id: new Id(input.id),
            name: input.name,
            description: input.description,
            salesPrice: input.price * 1.20,
        })
      await this.productRepository.add(entity);
    }
}