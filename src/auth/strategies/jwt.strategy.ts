import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt"
import { JWTPayload } from "../interface";
import { JWTConfiguration } from "src/config/jwt.config";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(
        private jwtConfig: JWTConfiguration
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, 
            secretOrKey: jwtConfig.jwtSecretKey,
          });   
    }

    async validate(payload: JWTPayload) {
        return {userId: payload.sub, username: payload.username}
    }
}