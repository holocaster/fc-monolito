export interface AddStoreCatalogFacadeInputDto {
  id: string;
  name: string;
  description: string;
  price: number;
}


export interface FindStoreCatalogFacadeInputDto {
  id: string;
}

export interface FindStoreCatalogFacadeOutputDto {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}

export interface FindAllStoreCatalogFacadeOutputDto {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
}

export default interface StoreCatalogFacadeInterface {
  add(input: AddStoreCatalogFacadeInputDto): Promise<void>;
  find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto>;
  findAll(): Promise<FindAllStoreCatalogFacadeOutputDto>;
}