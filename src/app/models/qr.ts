export class Qr {
    id: string;
    qrStringRepresentation: string;
    used: boolean;
    expired: boolean;
    available: boolean;
    date: Date;

    constructor(id: string, qrStringRepresentation: string, used: boolean, expired: boolean, available: boolean, date: Date) {
        this.id = id;
        this.qrStringRepresentation = qrStringRepresentation;
        this.used = used;
        this.expired = expired;
        this.available = available;
        this.date = date;
    }
}
