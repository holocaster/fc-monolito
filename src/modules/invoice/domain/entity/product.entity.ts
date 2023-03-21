import AggregateRoot from "../../../@shared/domain/entity/agrgregate-root.interface";
import BaseEntity from "../../../@shared/domain/entity/base.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";



type ProductProps = {
    id?: Id;
    name: string;
    price: number;
    createdAt?: Date;
    updateAt?: Date;
}

export default class ProductEntity extends BaseEntity implements AggregateRoot {

    private _name: string;
    private _price: number;

    constructor(props: ProductProps) {
        super(props.id, props.createdAt, props.updateAt);
        this._name = props.name;
        this._price = props.price;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }
    
}