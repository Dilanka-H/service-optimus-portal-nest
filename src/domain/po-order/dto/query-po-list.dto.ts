import { IsArray, IsOptional, IsString, Matches } from 'class-validator';
import { RequireBothFields } from 'src/common/decorators/validation.decorator';

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
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {message: `POstartDate must be in the format "YYYY-MM-DD"`})
  @RequireBothFields("POendDate")
  POstartDate: string;

  @IsString()
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {message: `POendDate must be in the format "YYYY-MM-DD"`})
  @RequireBothFields("POstartDate")
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
