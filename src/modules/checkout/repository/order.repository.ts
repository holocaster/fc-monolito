import Order from "../domain/order.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import { OrderModel } from "./order.model";

export default class OrderRepository implements CheckoutGateway {

    async addOrder(order: Order): Promise<void> {
        await OrderModel.create({
            id: order.id.id,
            status: order.status,
            clientId: order.client.id.id,
            clientName: order.client.name,
            products: order.products.map( (product) => ({
                productId: product.id,
                price: product.salesPrice,
                name: product.name
            })),
            createdAt: order.createdAt,
            updatedAt: order.updatedAt
        });
    }
    async findOrder(id: string): Promise<Order> {
        return null;
    }
}