import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import CheckoutFacadeInterface, { PlaceOrderFacadeInputDto, PlaceOrderFacadeOutputDto } from "./checkout.facade.interface";

export default class CheckoutFacade implements CheckoutFacadeInterface {
    private _placeOrderUsecase: UseCaseInterface;

    constructor(placeOrderUsecase: UseCaseInterface) {
        this._placeOrderUsecase = placeOrderUsecase;
    }

    async placeOrder(input: PlaceOrderFacadeInputDto): Promise<PlaceOrderFacadeOutputDto> {
        return this._placeOrderUsecase.execute(input);
    }

}