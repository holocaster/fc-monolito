import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceEntity from "../../domain/entity/invoce.entity";
import ProductEntity from "../../domain/entity/product.entity";
import Address from "../../domain/value-object/address";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

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
        price: 100
    }),
    new ProductEntity({
        id: new Id("2"),
        name: "product 2",
        price: 300
    })
    ],
});

const MockRepository = () => {
    return {
        find: jest.fn(),
        generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    };
};

describe("Generate invoice use caste test", () => {
    it("should generate invoice", async () => {
        const repository = MockRepository();
        const usecase = new GenerateInvoiceUseCase(repository);

        const input = {
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price
            }))
        }

        const result = await usecase.execute(input);

        expect(repository.generate).toHaveBeenCalled()
        expect(result.id).toBeDefined();
        expect(result.name).toEqual(input.name);
        expect(result.city).toEqual(input.city);
        expect(result.complement).toEqual(input.complement);
        expect(result.document).toEqual(input.document);
        expect(result.number).toEqual(input.number);
        expect(result.state).toEqual(input.state);
        expect(result.street).toEqual(input.street);
        expect(result.total).toBe(400);

        expect(result.items.length).toBe(2);
        expect(result.items[0].id).toEqual("1");
        expect(result.items[0].name).toEqual("product 1");
        expect(result.items[0].price).toBe(100);

        expect(result.items[1].id).toEqual("2");
        expect(result.items[1].name).toEqual("product 2");
        expect(result.items[1].price).toBe(300);
    });
});