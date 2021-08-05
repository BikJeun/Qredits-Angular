export class Merchant {
    id: string;
    merchantName: string;
    email: string;
    password: string;
    acctCreationDate: string;
    role: string;

    constructor(id: string, merchantName: string, email: string, password: string, acctCreationDate: string, role: string) {
        this.id = id;
        this.merchantName = merchantName;
        this.email = email;
        this.password = password;
        this.acctCreationDate = acctCreationDate;
        this.role = role;
    }

}
