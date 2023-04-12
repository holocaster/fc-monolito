import { ProductInvoiceModel } from './../../modules/invoice/repository/product-invoice.model';
import { InvoiceModel } from './../../modules/invoice/repository/invoice.model';
import { checkoutRoute } from './routes/checkout.route';
import { clientRoute } from './routes/client.route';
import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { productRoute } from "./routes/product.route";
import { ProductModel } from "../../modules/product-adm/repository/product.model";
import { OrderModel } from './../../modules/checkout/repository/order.model';
import { ClientModel } from '../../modules/client-adm/repository/client.model';
import { ProductOrderModel } from '../../modules/checkout/repository/product-order.model';
import TransactionModel from '../../modules/payment/repository/transaction.model';
import CatalogModel from '../../modules/store-catalog/repository/product.model';
import { invoiceRoute } from './routes/invoice.route';

export const app: Express = express();
app.use(express.json());
app.use("/products", productRoute);
app.use("/clients", clientRoute);
app.use("/checkout", checkoutRoute);
app.use("/invoice", invoiceRoute);

export let sequelize: Sequelize;

async function setupDb() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false
    });

    await sequelize.addModels([ClientModel, ProductModel, OrderModel, ProductOrderModel, InvoiceModel, ProductInvoiceModel, TransactionModel, CatalogModel]);
    await sequelize.sync();
}

setupDb();