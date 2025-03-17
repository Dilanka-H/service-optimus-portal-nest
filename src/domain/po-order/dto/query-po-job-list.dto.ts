import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsObject, IsOptional, IsString, Matches, ValidateNested } from 'class-validator';
import { RequireAtleastOne, RequireBothFields } from 'src/common/decorators/validation.decorator';

export class Inspect1Dto {
  @IsString()
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: `Inspect1startDate must be in the format "YYYY-MM-DD"` })
  @RequireBothFields('Inspect1endDate')
  Inspect1startDate: string;

  @IsString()
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: `Inspect1endDate must be in the format "YYYY-MM-DD"` })
  @RequireBothFields('Inspect1startDate')
  Inspect1endDate: string;

  @IsString()
  @IsOptional()
  Inspect1status: string;
}

export class Inspect2Dto {
  @IsString()
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: `Inspect2startDate must be in the format "YYYY-MM-DD"` })
  @RequireBothFields('Inspect2endDate')
  Inspect2startDate: string;

  @IsString()
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: `Inspect2endDate must be in the format "YYYY-MM-DD"` })
  @RequireBothFields('Inspect2startDate')
  Inspect2endDate: string;

  @IsString()
  @IsOptional()
  Inspect2status: string;
}

export class GIGRDto {
  @IsString()
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: `GIGRstartDate must be in the format "YYYY-MM-DD"` })
  @RequireBothFields('GIGRendDate')
  GIGRstartDate: string;

  @IsString()
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: `GIGRendDate must be in the format "YYYY-MM-DD"` })
  @RequireBothFields('GIGRstartDate')
  GIGRendDate: string;
}

export class QueryPoJobListDto {
  @IsString()
  @IsOptional()
  PONumber: string;

  @IsString()
  @IsOptional()
  jobId: string;

  @IsArray()
  @IsOptional()
  jobStatus: string[];

  @IsArray()
  @IsOptional()
  excludeStatus: string[];

  @IsString()
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: `POstartDate must be in the format "YYYY-MM-DD"` })
  @RequireBothFields('POendDate')
  POstartDate: string;

  @IsString()
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: `POendDate must be in the format "YYYY-MM-DD"` })
  @RequireBothFields('POstartDate')
  POendDate: string;

  @IsString()
  @IsOptional()
  PRNumber: string;

  @IsString()
  @IsOptional()
  POStatus: string;

  @IsString()
  @IsOptional()
  SalesOrder: string;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => Inspect1Dto)
  Inspect1: Inspect1Dto;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => Inspect2Dto)
  Inspect2: Inspect2Dto;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => GIGRDto)
  GIGR: GIGRDto;

  @IsArray()
  @IsOptional()
  SIMGroup: string[];

  @IsString()
  @IsOptional()
  material: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  flagPrintPO: boolean = false;

  @IsString()
  @IsOptional()
  searchIns: string = '';

  @RequireAtleastOne(['POstartDate', 'POendDate', 'GIGRstartDate'])
  ObjectValidation?: string;
}
