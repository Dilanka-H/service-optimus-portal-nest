import { IsString, IsNotEmpty, IsOptional, IsArray, IsDate, IsBoolean } from 'class-validator';

export class QueryPoListDto {
  @IsString()
  @IsOptional()
  PONumber: string;

  @IsString()
  @IsOptional()
  PRNumber: string;

  @IsArray()
  @IsOptional()
  POStatus: string[];

  @IsString()
  @IsNotEmpty()
  POstartDate: string;

  @IsString()
  @IsNotEmpty()
  POendDate: string;

  @IsArray()
  @IsOptional()
  excludeStatus: string[];

  @IsArray()
  @IsOptional()
  SIMGroup: string[];

  @IsString()
  @IsOptional()
  Material: string;

  @IsString()
  @IsOptional()
  Description: string;
}
