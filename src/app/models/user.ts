export class User {
    id?: string;
    email?: string;
    password?: string;
    firstname?: string;
    lastName?: string;
    acctCreationDate?: Date;

    constructor(id?: string, email?: string, password?: string, firstname?: string, lastName?: string, acctCreationDate?: Date) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastName = lastName;
        this.acctCreationDate = acctCreationDate;
    }
}
