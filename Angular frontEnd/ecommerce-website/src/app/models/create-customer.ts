export class CreateCustomer {
    firstName: string
    lastName: string
    email: string
    login: string
    constructor(customer: CreateCustomer) {
        this.firstName = customer.firstName
        this.lastName = customer.lastName
        this.email = customer.email
        this.login = customer.email

    }
}
