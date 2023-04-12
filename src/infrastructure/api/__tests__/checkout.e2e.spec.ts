import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for checkout", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a checkout order approved", async () => {

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
                { productId: responseProduct1.body.id },
                { productId: responseProduct2.body.id }
            ]
        }

        const responseCheckout = await request(app).post("/checkout").send(inputCheckout);

        expect(responseCheckout.body.id).toBeDefined();
        expect(responseCheckout.body.invoiceId).toBeDefined();
        expect(responseCheckout.body.status).toBe("approved");
        expect(responseCheckout.body.total).toBe(240);
        expect(responseCheckout.body.products[0].productId).toBeDefined();
        expect(responseCheckout.body.products[1].productId).toBeDefined();
    });


    it("should create a checkout order declined", async () => {

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
                purchasePrice: 25,
                stock: 10,
            });

        const responseProduct2 = await request(app)
            .post("/products")
            .send({
                name: "Product 2",
                description: "Product 2 description",
                purchasePrice: 20,
                stock: 5,
            });

        const inputCheckout = {
            clientId: responseClient.body.id,
            products: [
                { productId: responseProduct1.body.id },
                { productId: responseProduct2.body.id }
            ]
        }

        const responseCheckout = await request(app).post("/checkout").send(inputCheckout);

        expect(responseCheckout.body.id).toBeDefined();
        expect(responseCheckout.body.invoiceId).toBeNull();
        expect(responseCheckout.body.status).toBe("declined");
        expect(responseCheckout.body.total).toBe(54);
        expect(responseCheckout.body.products[0].productId).toBeDefined();
        expect(responseCheckout.body.products[1].productId).toBeDefined();
    });
});