import { app, sequelize } from "../express";
import request from "supertest";


describe("E2E test for client", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a client", async () => {
        const response = await request(app)
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

        expect(response.status).toBe(200);
        expect(response.body.id).toBeDefined();

        const responseGet = await request(app).get(`/clients/${response.body.id}`).send();

        expect(responseGet.body.name).toBe("Client 1");
        expect(responseGet.body.email).toBe("x@x.com");
        expect(responseGet.body.document).toEqual("adfsdff");
        expect(responseGet.body.street).toBe("street");
        expect(responseGet.body.number).toBe("number");
        expect(responseGet.body.complement).toBe("4322");
        expect(responseGet.body.city).toBe("city");
        expect(responseGet.body.state).toBe("state");
        expect(responseGet.body.zipCode).toBe("zipCode");
    });
});