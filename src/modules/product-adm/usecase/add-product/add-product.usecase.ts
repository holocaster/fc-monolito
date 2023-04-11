import { AddProductInputDto, AddProductOutputDto } from './add-product.dto';
import ProductGateway from "../../gateway/product.gateway";
import Product from '../../domain/product.entity';
import Id from '../../../@shared/domain/value-object/id.value-object';
import StoreCatalogFacadeInterface from '../../../store-catalog/facade/store-catalog.facade.interface';

export default class AddProductUseCase {
    private _productRepository: ProductGateway;
    private _storeCatalogFacade: StoreCatalogFacadeInterface;

    constructor(_productRepository: ProductGateway, storeCatalogFacade: StoreCatalogFacadeInterface) {
        this._productRepository = _productRepository;
        this._storeCatalogFacade = storeCatalogFacade;
    }

    async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
        const props = {
            id: new Id(input.id),
            name: input.name,
            description: input.description,
            purchasePrice: input.purchasePrice,
            stock: input.stock,
        };

        const product = new Product(props);
        this._productRepository.add(product);

        this._storeCatalogFacade.add( {
            id: product.id.id,
            name: product.name,
            description: product.description,
            price: product.purchasePrice
        });

        return {
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        };
    }
}