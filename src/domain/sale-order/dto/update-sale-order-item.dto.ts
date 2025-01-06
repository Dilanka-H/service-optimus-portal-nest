import { IsString, IsNotEmpty, ValidateNested, IsEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class ConditionDto {
    @IsString()
    @IsNotEmpty()
    channel: string;
  
    @IsString()
    @IsNotEmpty()
    itemRefId: boolean;
}

class UpdateDataDto {
    @IsString()
    @IsNotEmpty()
    "deviceInfo.phoneType?": string;
}

export class UpdateSaleOrderItemDto {
  @ValidateNested()
  @Type(() => ConditionDto)
  condition: ConditionDto;

  @ValidateNested()
  @Type(() => UpdateDataDto)
  updateData: UpdateDataDto;
}
