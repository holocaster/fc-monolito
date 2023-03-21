import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceEntity from "../../domain/entity/invoce.entity";
import ProductEntity from "../../domain/entity/product.entity";
import Address from "../../domain/value-object/address";
import FindInvoiceUseCase from "./find-invoice.usecase";

const invoice = new InvoiceEntity({
    id: new Id("1"),
    name: "John",
    document: "1232132323",
    address: new Address({
        state: "available",
        street: "Street",
        city: "City",
        zipCode: "Zip Code",
        number: "Number"
    }),
    items: [new ProductEntity({
        id: new Id("1"),
        name: "product 1",
        price: 2.5
    })],
});

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
        generate: jest.fn(),
    };
};

describe("Find invoice usecase unit test", () => {
    it("should find a invoice", async () => {
        const repository = MockRepository();
        const usecase = new FindInvoiceUseCase(repository);

        const input = {
            id: "1",
        };

        const result = await usecase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toEqual(input.id);
        expect(result.name).toEqual(invoice.name);
        expect(result.document).toEqual(invoice.document);
        expect(result.address.street).toEqual(invoice.address.street);
        expect(result.address.number).toEqual(invoice.address.number);
        expect(result.address.city).toEqual(invoice.address.city);
        expect(result.address.state).toEqual(invoice.address.state);
        expect(result.address.zipCode).toEqual(invoice.address.zipCode);
        expect(result.items.length).toEqual(invoice.items.length);
        expect(result.items[0].id).toEqual(invoice.items[0].id.id);
        expect(result.items[0].name).toEqual(invoice.items[0].name);
        expect(result.items[0].price).toEqual(invoice.items[0].price);
        expect(result.createdAt).toEqual(invoice.createdAt);
    });
});