import { CreateCustomer } from "./create-customer";
import { Credentials } from "./credentials";

export class CreateAccountDTO {
    profile: CreateCustomer
    credentials: Credentials
    constructor(profile: CreateCustomer, credentials: Credentials) {
        this.profile = profile
        this.credentials = credentials
    }
}
