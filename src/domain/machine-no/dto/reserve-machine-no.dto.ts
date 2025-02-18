import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ReserveMachineNoDto {
  @IsArray()
  @IsNotEmpty()
  machineNo: string;

  @IsBoolean()
  @IsNotEmpty()
  reserveFlag: boolean;

  @IsString()
  @IsNotEmpty()
  updateBy: string;
}