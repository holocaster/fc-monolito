import { InvoiceModel } from './../repository/invoice.model';
import { Sequelize } from "sequelize-typescript";
import { ProductInvoiceModel } from '../repository/procut-invoice.model';
import InvoiceRepository from '../repository/invoice.repository';
import GenerateInvoiceUseCase from '../usecase/generate-invoice/generate-invoice.usecase';
import InvoiceFacade from './invoice.facade';
import InvoiceEntity from '../domain/entity/invoce.entity';
import Id from '../../@shared/domain/value-object/id.value-object';
import Address from '../domain/value-object/address';
import ProductEntity from '../domain/entity/product.entity';
import InvoiceFacadeFactory from '../factory/invoice.facade.factory';

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

describe("InvoiceFacade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([InvoiceModel, ProductInvoiceModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should generate an invoice", async () => {
        const repostory = new InvoiceRepository();
        const usecase = new GenerateInvoiceUseCase(repostory);
        const facade = new InvoiceFacade({
            findUsecase: undefined,
            generateUseCase: usecase
        });

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


        const output = await facade.generate(input);

        const result = await InvoiceModel.findOne({
            where: { id: output.id },
            include: [{ model: ProductInvoiceModel }],
        });

        expect(result).toBeDefined();
        expect(result.id).toEqual(output.id);
        expect(result.name).toEqual("John");
        expect(result.document).toEqual("1232132323");
        expect(result.state).toEqual("available");
        expect(result.street).toEqual("Street");
        expect(result.city).toEqual("City");
        expect(result.zipCode).toEqual("Zip Code");
        expect(result.number).toEqual("Number");
        expect(result.items[0].name).toEqual("product 1");
        expect(result.items[0].price).toEqual(100);
        expect(result.items[0].id).toEqual("1");
    });

    it("should find an invoice", async () => {
        // const repostory = new InvoiceRepository();
        // const usecase = new GenerateInvoiceUseCase(repostory);
        // const facade = new InvoiceFacade({
        //     findUsecase: undefined,
        //     generateUseCase: usecase
        // });

        const facade = InvoiceFacadeFactory.create();

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

        const output = await facade.generate(input);

        const result = await facade.find({id: output.id});

        expect(result).toBeDefined();
        expect(result.id).toEqual(output.id);
        expect(result.name).toEqual("John");
        expect(result.document).toEqual("1232132323");
        expect(result.address.state).toEqual("available");
        expect(result.address.street).toEqual("Street");
        expect(result.address.city).toEqual("City");
        expect(result.address.zipCode).toEqual("Zip Code");
        expect(result.address.number).toEqual("Number");
        expect(result.items[0].name).toEqual("product 1");
        expect(result.items[0].price).toEqual(100);
        expect(result.items[0].id).toEqual("1");

    });
});
