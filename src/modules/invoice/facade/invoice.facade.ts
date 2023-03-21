import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { FindClientFacadeOutputDto } from "../../client-adm/facade/client-adm.facade.interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto } from "./invoice.facade.interface";

export interface UseCaseProps {
    findUsecase: UseCaseInterface;
    generateUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {

    private _findUsecase: UseCaseInterface;
    private _generateUseCase: UseCaseInterface;

    constructor(usecaseProps: UseCaseProps) {
        this._findUsecase = usecaseProps.findUsecase;
        this._generateUseCase = usecaseProps.generateUseCase;
    }

    async generate(input: GenerateInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDTO> {
        return await this._generateUseCase.execute(input);
    }

    async find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
        return await this._findUsecase.execute(input);
    }

}