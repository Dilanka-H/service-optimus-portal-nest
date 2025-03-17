import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePoJobListDto {
  @IsString()
  @IsNotEmpty()
  jobId: string;

  @IsString()
  @IsOptional()
  jobStatus: string;

  @IsString()
  @IsOptional()
  inspect1Status: string;

  @IsString()
  @IsOptional()
  inspect2Status: string;

  @IsString()
  @IsOptional()
  inspect2IgnoreReason: string;

  @IsBoolean()
  @IsOptional()
  flagSendMail: boolean;

  tokenUser?: string;
}
