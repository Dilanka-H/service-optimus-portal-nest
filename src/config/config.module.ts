// config/config.module.ts

import { ConfigifyModule } from '@itgorillaz/configify';
import { Module } from '@nestjs/common';
import { MongoConfiguration } from './mongo.config';

@Module({
  imports: [ConfigifyModule.forRootAsync()],
  providers: [MongoConfiguration, ],
  exports: [MongoConfiguration, ],
})
export class AppConfigModule {}
