export class Login {
    username: string;
    password: string;
}

export class LoginResponse{
    data: string;
    response: string;
}

export class LoginResponseData{
    jwtToken: string;
    roleName: string;
}
