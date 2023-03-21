import { InvoiceModel } from './invoice.model';
import { Sequelize } from 'sequelize-typescript';
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceEntity from "../domain/entity/invoce.entity";
import ProductEntity from "../domain/entity/product.entity";
import Address from "../domain/value-object/address";
import { ProductInvoiceModel } from './procut-invoice.model';
import InvoiceRepository from './invoice.repository';

const productOne = new ProductEntity({
    id : new Id("1"),
    name: "Product 1",
    price: 12,
    createdAt: new Date(),
    updateAt: new Date(),
});


const address = new Address({
  state: "available",
  street: "Street",
  city: "City",
  complement: "complement",
  zipCode: "Zip Code",
  number: "Number"
});

const invoice = new InvoiceEntity({
    id: new Id("1"),
    name: "Invoice",
    document: "34323434",
    address: address,
    items: [productOne]
});

describe("Invoice Repository tests", () => {
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

  it("Should create a new Invoice", async () => {
      const invoiceRepository = new InvoiceRepository();

      await invoiceRepository.generate(invoice);

      const result = await InvoiceModel.findOne({
        where: {id: "1"},
        include: [{ model: ProductInvoiceModel }],
      });

      expect(result.id).toEqual("1");
      expect(result.createdAt).toBeDefined();
      expect(result.name).toEqual("Invoice");
      expect(result.document).toEqual("34323434");
      expect(result.state).toEqual("available");
      expect(result.street).toEqual("Street");
      expect(result.city).toEqual("City");
      expect(result.complement).toEqual("complement");
      expect(result.zipCode).toEqual("Zip Code");
      expect(result.number).toEqual("Number");
      expect(result.items[0].name).toEqual( "Product 1");
      expect(result.items[0].price).toEqual(12);
      expect(result.items[0].id).toEqual("1");
  }); 

  it("should throw an error when invoice is not found", async () => {

    const invoiceRepository = new InvoiceRepository();

    expect(async () => {
      await invoiceRepository.find("323434");
    }).rejects.toThrow("Invoice not found");
  });

  it("Show find an invoice", async() => {
    const invoiceRepository = new InvoiceRepository();

      await invoiceRepository.generate(invoice);

      const result = await invoiceRepository.find("1");

      expect(invoice).toStrictEqual(result);
  });

});