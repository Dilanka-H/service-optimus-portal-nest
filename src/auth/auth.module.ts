import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWTConfiguration } from 'src/config/jwt.config';
import { UserModule } from 'src/domain/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  providers: [AuthService, LocalStrategy, JWTStrategy],
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [JWTConfiguration],
      useFactory: (jwtConfig: JWTConfiguration) => {
        return {
          secret: jwtConfig.jwtSecretKey,
          signOptions: {
            expiresIn: jwtConfig.jwtExpiry,
          },
        };
      },
    })
  ]
})
export class AuthModule {}
