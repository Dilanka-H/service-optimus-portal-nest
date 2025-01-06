import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/domain/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JWTStrategy } from './strategies/jwt.strategy';
import { JWTConfiguration } from 'src/config/jwt.config';
import { MongoModule } from 'src/database/mongo/mongo.module';

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
