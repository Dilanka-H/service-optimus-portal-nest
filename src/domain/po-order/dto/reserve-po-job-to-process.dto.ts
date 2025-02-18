import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ReservePoJobToProcessDto {
  @IsArray()
  @IsNotEmpty()
  jobId: string[];

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? value === 'true' || value === true : true))
  reserveFlag: boolean;

  @IsString()
  @IsNotEmpty()
  action: string;

  @IsString()
  @IsOptional()
  SIMGroup?: string;

  // @IsString()
  tokenUser?: string;
}
