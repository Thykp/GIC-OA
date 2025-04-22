import { IsUUID, IsString, Length, IsOptional, IsEmail, Matches } from 'class-validator';

export class NewCafeDto {
  @IsString()
  @Length(6, 10)
  name!: string;

  @IsString()
  @Length(1, 256)
  description!: string;

  @IsOptional()
  @IsString()
  logo_url?: string;

  @IsString()
  location!: string;
}

export class UpdateCafeDto {
  @IsUUID()
  id!: string;

  @IsOptional()
  @IsString()
  @Length(6, 10)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(1, 256)
  description?: string;

  @IsOptional()
  @IsString()
  logo_url?: string;

  @IsOptional()
  @IsString()
  location?: string;
}

export class NewEmployeeDto {
  @Matches(/^UI[a-zA-Z0-9]{7}$/)
  id!: string;

  @IsString()
  @Length(6, 10)
  name!: string;

  @IsEmail()
  email_address!: string;

  @Matches(/^[89]\d{7}$/)
  phone_number!: string;

  @Matches(/^(Male|Female)$/)
  gender!: string;

  @IsUUID()
  cafe_id!: string;
}

export class UpdateEmployeeDto {
  @Matches(/^UI[a-zA-Z0-9]{7}$/)
  id!: string;

  @IsOptional()
  @IsString()
  @Length(6, 10)
  name?: string;

  @IsOptional()
  @IsEmail()
  email_address?: string;

  @IsOptional()
  @Matches(/^[89]\d{7}$/)
  phone_number?: string;

  @IsOptional()
  @Matches(/^(Male|Female)$/)
  gender?: string;

  @IsOptional()
  @IsUUID()
  cafe_id?: string;
}