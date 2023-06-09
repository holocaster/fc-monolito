import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-product.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import StoreCatalogFacadeInterface, { AddStoreCatalogFacadeInputDto, FindAllStoreCatalogFacadeOutputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto } from "./store-catalog.facade.interface";

export interface UseCaseProps {
    findUseCase: FindProductUseCase;
    findAllUseCase: FindAllProductsUsecase;
    addUseCase: AddProductUseCase;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
    private _findUseCase: FindProductUseCase;
    private _findAllUseCase: FindAllProductsUsecase;
    private _addUseCase: AddProductUseCase;
  
    constructor(props: UseCaseProps) {
      this._findUseCase = props.findUseCase;
      this._findAllUseCase = props.findAllUseCase;
      this._addUseCase = props.addUseCase;
    }

    async add(input: AddStoreCatalogFacadeInputDto): Promise<void> {
      await this._addUseCase.execute(input)
    }
  
    async find(
      id: FindStoreCatalogFacadeInputDto
    ): Promise<FindStoreCatalogFacadeOutputDto> {
      return await this._findUseCase.execute(id);
    }
    async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
      return await this._findAllUseCase.execute();
    }
  }