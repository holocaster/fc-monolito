import AgggregateRoot from "../../../@shared/domain/entity/agrgregate-root.interface";
import BaseEntity from "../../../@shared/domain/entity/base.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../value-object/address";
import ProductEntity from "./product.entity";


type InvoiceProps = {
    id?: Id;
    name: string;
    document: string;
    address: Address;
    items: ProductEntity[];
    createdAt?: Date;
    updatedAt?: Date;
}


export default class InvoiceEntity extends BaseEntity implements AgggregateRoot {

    private _name: string;
    private _document: string;
    private _address: Address;
    private _items: ProductEntity[];
    
    constructor(props: InvoiceProps) {
        super(props.id, props.createdAt, props.updatedAt);
        this._name = props.name;
        this._document = props.document;
        this._address = props.address;
        this._items = props.items;
    }
    
    public get name(): string {
        return this._name;
    }
    
    public get document(): string {
        return this._document;
    }

    public get address(): Address {
        return this._address;
    }

    public get items(): ProductEntity[] {
        return this._items;
    }

    get total(): number {
        let total = 0;
        this._items.forEach(item => total += item.price);
        return total;
    }
}

