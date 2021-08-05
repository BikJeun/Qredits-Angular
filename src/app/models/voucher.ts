export class Voucher {
    id: string;
    value: number;
    qty: number;
    expiry: Date;
    isAvailable: boolean;
    isGenerated: boolean;
    price: number;

    constructor(id: string, value: number, qty: number, expiry: Date, isAvailable: boolean, isGenerated: boolean, price: number) {
        this.id = id;
        this.value = value;
        this.qty = qty;
        this.expiry = expiry;
        this.isAvailable = isAvailable;
        this.isGenerated = isGenerated;
        this.price = price;
    }
}
