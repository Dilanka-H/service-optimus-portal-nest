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
  @IsOptional()
  POStatus?: string;

  @IsString()
  @IsOptional()
  jobStatus?: string;

  @IsString()
  @IsOptional()
  inspectStatus1?: string;

  @IsString()
  @IsOptional()
  inspectStatus2?: string;

  @IsString()
  @IsOptional()
  inspect2IgnoreReason?: string;

  // @IsString()
  tokenUser?: string;
}
