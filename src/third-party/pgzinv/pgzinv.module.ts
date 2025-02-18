import { Module } from '@nestjs/common';
import { ConfirmPreparationServiceService } from './confirm-preparation.service/confirm-preparation.service.service';
import { PgzinvService } from './pgzinv.service';

@Module({
  providers: [ConfirmPreparationServiceService, PgzinvService]
})
export class PgzinvModule {}
