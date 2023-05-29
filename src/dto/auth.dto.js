export class AuthDto {
    login;
    password;
    constructor(login, password) {
        this.login = login;
        this.password = password;
    }
}
