import { IsBoolean, IsOptional, IsString, Matches } from 'class-validator';
import { RequireBothFields } from 'src/common/decorators/validation.decorator';

export class QueryMasterCustomerDto {
    @IsString()
    @IsOptional()
    SAPCode: string

    @IsString()
    @IsOptional()
    customerName: string

    @IsString()
    @IsOptional()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {message: `PGPExpireDateFrom must be in the format "YYYY-MM-DD"`})
    @RequireBothFields("PGPExpireDateTo")
    PGPExpireDateFrom: string

    @IsString()
    @IsOptional()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {message: `PGPExpireDateTo must be in the format "YYYY-MM-DD"`})
    @RequireBothFields("PGPExpireDateFrom")
    PGPExpireDateTo: string

    @IsString()
    @IsOptional()
    status: string

    @IsBoolean()
    @IsOptional()
    flagValidate: boolean

    @IsString()
    @IsOptional()
    products: string
}