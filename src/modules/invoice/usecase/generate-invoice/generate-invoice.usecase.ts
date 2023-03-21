import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from './generate-invoice.usecase.dto';
import InvoiceGateway from "../../gateway/invoice.gateway";
import InvoiceEntity from '../../domain/entity/invoce.entity';
import Id from '../../../@shared/domain/value-object/id.value-object';
import Address from '../../domain/value-object/address';
import ProductEntity from '../../domain/entity/product.entity';
import UseCaseInterface from '../../../@shared/usecase/use-case.interface';

export default class GenerateInvoiceUseCase implements UseCaseInterface{
    private _invoiceRepostory: InvoiceGateway;


    constructor(invoiceRepository: InvoiceGateway) {
        this._invoiceRepostory = invoiceRepository;
    }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const invoice = new InvoiceEntity({
            id: new Id(),
            name: input.name,
            document: input.document,
            address: new Address({
                street: input.street,
                number: input.number,
                complement: input.complement,
                city: input.city,
                state: input.state,
                zipCode: input.zipCode,
            }),
            items: input.items.map(i => new ProductEntity({
                id: new Id(i.id),
                name: i.name,
                price: i.price
            }))
        });

        await this._invoiceRepostory.generate(invoice);

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            city: invoice.address.city,
            items: invoice.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
            })),
            total: invoice.total
        }
    }
}