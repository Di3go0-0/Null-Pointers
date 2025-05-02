import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString, MinLength } from 'class-validator';

export class PatchPersonalInfoDto {
  @ApiPropertyOptional({
    description: 'User identification number',
    example: '1234567890'
  })
  @IsOptional()
  @IsString()
  identificationNumber?: string;

  @ApiPropertyOptional({
    description: 'User birth date (send as ISO 8601 string)',
    example: '1990-01-01T00:00:00.000Z',
    type: String
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  birthdate?: Date;

  @ApiPropertyOptional({
    description: 'User home address',
    example: '123 Main Street, City, Country'
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    description: 'User phone number',
    example: '+1234567890'
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;
}
