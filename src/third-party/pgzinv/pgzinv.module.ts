import { Module } from '@nestjs/common';
import { PgzinvService } from './pgzinv.service';
import { ConfirmPreparationService } from './resources/confirm-preparation/confirm-preparation.service';

@Module({
  providers: [ConfirmPreparationService, PgzinvService],
})
export class PgzinvModule {}
