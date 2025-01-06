// config/config.module.ts

import { Module } from '@nestjs/common';
import { MongoConfiguration } from './mongo.config';
import { JWTConfiguration } from './jwt.config';
import { IDSConfiguration } from './ids.config';
import { ESBConfiguration } from './esb.config';
import { SKYConfiguration } from './sky.config';
import { ConfigifyModule } from '@itgorillaz/configify';

@Module({
  imports: [ConfigifyModule.forRootAsync()],
  providers: [MongoConfiguration, ],
  exports: [MongoConfiguration, ],
})
export class AppConfigModule {}
