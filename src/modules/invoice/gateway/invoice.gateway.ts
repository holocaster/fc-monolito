import InvoiceEntity from "../domain/entity/invoce.entity";

export default interface InvoiceGateway {
    find(id: String): Promise<InvoiceEntity>;
    generate(input: InvoiceEntity): Promise<void>;
}