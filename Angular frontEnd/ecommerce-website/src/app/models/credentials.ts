import { Password } from "./password";

export class Credentials {
    password: Password
    constructor(value: Password) {
        this.password = value
    }
}
