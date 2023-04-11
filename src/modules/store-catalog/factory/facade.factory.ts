import StoreCatalogFacade from "../facade/store-catalog.facade";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-product.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";

export default class StoreCatalogFacadeFactory {
    static create(): StoreCatalogFacade {
      const productRepository = new ProductRepository();
      const findUseCase = new FindProductUseCase(productRepository);
      const findAllUseCase = new FindAllProductsUsecase(productRepository);
      const addUseCase = new AddProductUseCase(productRepository);
  
      const facade = new StoreCatalogFacade({
        findUseCase: findUseCase,
        findAllUseCase: findAllUseCase,
        addUseCase: addUseCase
      });
      return facade;
    }
  }