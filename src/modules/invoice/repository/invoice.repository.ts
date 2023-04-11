import { ProductInvoiceModel } from './product-invoice.model';
import { InvoiceModel } from './invoice.model';
import InvoiceEntity from "../domain/entity/invoce.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import Id from '../../@shared/domain/value-object/id.value-object';
import Address from '../domain/value-object/address';
import ProductEntity from '../domain/entity/product.entity';

export default class InvoiceRepository implements InvoiceGateway {

    async generate(entity: InvoiceEntity): Promise<void> {
        await InvoiceModel.create({
            id: entity.id.id,
            name: entity.name,
            document: entity.document,
            street: entity.address.street,
            number: entity.address.number,
            complement: entity.address.complement,
            city: entity.address.city,
            state: entity.address.state,
            zipCode: entity.address.zipCode,
            items: entity.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt
            })),
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt
        },
            {
                include: [{ model: ProductInvoiceModel }],
            }
        );
    }

    async find(id: string): Promise<InvoiceEntity> {
       let invoice: InvoiceModel;
       
       try {
         invoice =  await InvoiceModel.findOne( {where : {id},
                include: [{ model: ProductInvoiceModel }],
                rejectOnEmpty: true,});
       } catch( error) {
        throw new Error("Invoice not found");
      }

      const items = invoice.items.map((item)=>{
        return new ProductEntity({
          id: new Id(item.id),
          name: item.name,
          price: item.price,
          createdAt: item.createdAt,
          updateAt: item.updatedAt
        })
      })

      return new InvoiceEntity({
        id: new Id( invoice.id),
        name: invoice.name,
        document: invoice.document,
        address: new Address({
            street: invoice.street,
            number: invoice.number,
            complement: invoice.complement,
            city: invoice.city,
            state: invoice.state,
            zipCode: invoice.zipCode,
        }),
        items: items,
        createdAt: invoice.createdAt,
        updatedAt: invoice.updatedAt
      } );
    }
}