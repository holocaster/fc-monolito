import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for checkout", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should get a invoice", async () => {
        const responseClient = await request(app)
            .post("/clients")
            .send({
                name: "Client 1",
                email: "x@x.com",
                document: "adfsdff",
                street: "street",
                number: "number",
                complement: "4322",
                city: "city",
                state: "state",
                zipCode: "zipCode"
            });

        const responseProduct1 = await request(app)
            .post("/products")
            .send({
                name: "Product 1",
                description: "Product 1 description",
                purchasePrice: 100,
                stock: 10,
            });

        const responseProduct2 = await request(app)
            .post("/products")
            .send({
                name: "Product 2",
                description: "Product 2 description",
                purchasePrice: 100,
                stock: 5,
            });

        const inputCheckout = {
            clientId: responseClient.body.id,
            products: [
                {productId: responseProduct1.body.id},
                {productId: responseProduct2.body.id}
            ]
        }

        const responseCheckout = await request(app).post("/checkout").send(inputCheckout);

        const responseInvoice = await request(app).get(`/invoice/${responseCheckout.body.invoiceId}`).send();

        expect(responseInvoice.body.id).toBe(responseCheckout.body.invoiceId);
        expect(responseInvoice.body.name).toBe('Client 1');
        expect(responseInvoice.body.document).toBe('adfsdff');
        expect(responseInvoice.body.address).toStrictEqual({
            street: 'street',
            number: 'number',
            complement: '4322',
            city: 'city',
            state: 'state',
            zipCode: 'zipCode'
          });
        expect(responseInvoice.body.items).toStrictEqual([
            {
              id: responseProduct1.body.id,
              name: 'Product 1',
              price: 120
            },
            {
              id: responseProduct2.body.id,
              name: 'Product 2',
              price: 120
            }
          ]);
        expect(responseInvoice.body.total).toBe(240);
        expect(responseInvoice.body.createdAt).toBeDefined();
    });
});


