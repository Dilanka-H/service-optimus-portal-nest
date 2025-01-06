import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsArray, IsDate, IsBoolean } from 'class-validator';

export class ReservePoJobToProcessDto {
  @IsString()
  @IsNotEmpty()
  jobId: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? value === 'true' || value === true : true))
  reserveFlag: boolean;

  @IsString()
  tokenUser?: string
}