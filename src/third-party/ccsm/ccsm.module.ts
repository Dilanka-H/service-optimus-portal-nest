import { Module } from '@nestjs/common';
import { CcsmService } from './ccsm.service';
import { CcsmController } from './ccsm.controller';

@Module({
  providers: [CcsmService],
  controllers: [CcsmController]
})
export class CcsmModule {}
