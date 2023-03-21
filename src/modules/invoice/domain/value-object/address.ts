type AddressProps = {
    street: string,
    number: string,
    complement?: string,
    city: string,
    state: string,
    zipCode: string
}

export default class Address {
    _street: string = "";
    _number: string = "";
    _complement?: string = "";
    _city: string = "";
    _state: string = "";
    _zipCode: string = "";

    constructor(props: AddressProps) {
        this._street = props.street;
        this._number = props.number;
        this._state = props.state;
        this._city = props.city;
        this._zipCode = props.zipCode;
        this._complement = props.complement;
        this.validate();
    }

    get street(): string {
        return this._street;
    }

    get number(): string {
        return this._number;
    }

    get zipCode(): string {
        return this._zipCode;
    }

    get city(): string {
        return this._city;
    }

    get complement(): string { 
        return this._complement;
    }

    get state(): string {
        return this._state;
    }

    validate() {
        if (this._street.length === 0) {
            throw new Error("Street is required");
        }
        if (this._number.length === 0) {
            throw new Error("Number is required");
        }
        if (this._zipCode.length === 0) {
            throw new Error("Zip is required");
        }
        if (this._city.length === 0) {
            throw new Error("City is required");
        }
        if (this._state.length === 0) {
            throw new Error("City is required");
        }
    }

    toString() {
        return `${this._street}, ${this._number}, ${this._zipCode} ${this._city}`;
    }
}