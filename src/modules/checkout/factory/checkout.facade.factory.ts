import { PlaceOrderFacadeInputDto } from './../facade/checkout.facade.interface';
import CheckoutFacadeInterface from "../facade/checkout.facade.interface";
import ClientAdmFacadeFactory from '../../client-adm/factory/client-adm.facade.factory';
import StoreCatalogFacadeFactory from '../../store-catalog/factory/facade.factory';
import ProductAdmFacadeFactory from '../../product-adm/factory/facade.factory';
import InvoiceFacadeFactory from '../../invoice/factory/invoice.facade.factory';
import PaymentFacadeFactory from '../../payment/factory/payment.facade.factory';
import OrderRepository from '../repository/order.repository';
import CheckoutFacade from '../facade/checkout.facade';
import PlaceOrderUseCase from '../usecase/place-order/place-order.usecase';

export default class CheckoutFacadeFactory {
    static create(): CheckoutFacadeInterface {
        const clientFacade = ClientAdmFacadeFactory.create();
        const catalogFacade = StoreCatalogFacadeFactory.create();
        const productFacade = ProductAdmFacadeFactory.create();
        const invoiceFacade = InvoiceFacadeFactory.create();
        const paymentFacade = PaymentFacadeFactory.create();
        const orderRepository = new OrderRepository();

        const placeOrderUsecase = new PlaceOrderUseCase(productFacade, clientFacade, catalogFacade, orderRepository, invoiceFacade, paymentFacade);
        return new CheckoutFacade(placeOrderUsecase)
    }
}