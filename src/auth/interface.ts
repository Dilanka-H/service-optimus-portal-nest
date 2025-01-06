export interface AuthInput {
    username: string;
    password: string;
}

export interface SignInData {
    userId: number;
    username: string;
}

export interface AuthResult { 
    accesToken: string; 
    userId: number; 
    username: string
}

export interface JWTPayload {
    sub: string;
    username: string
}

