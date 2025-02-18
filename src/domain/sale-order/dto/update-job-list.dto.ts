import { IsString, IsNotEmpty, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class ConditionDto {
  @IsString()
  @IsOptional()
  'contractInfo.saleOrderNo'?: string;

  @IsString()
  @IsNotEmpty()
  jobId: string;
}

class UpdateDataDto {
  @IsString()
  @IsNotEmpty()
  jobStatus: string;

  @IsOptional()
  printDeliverySheet: boolean;
}

export class UpdateJobListDto {
  @ValidateNested()
  @Type(() => ConditionDto)
  condition: ConditionDto;

  @ValidateNested()
  @Type(() => UpdateDataDto)
  updateData: UpdateDataDto;
}
