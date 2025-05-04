import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class PatchContractsTypesDto {
  @ApiProperty({
    type: String,
    example: 'Fixed Term Contract',
    required: false,
    description: 'Contract Type',
  })
  @IsOptional()
  @IsString()
  typeName?: string;

  @ApiProperty({
    type: String,
    example: 'Contract description',
    required: false,
    description: 'Contract description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: Boolean,
    example: true,
    required: false,
    description: 'Enabled for extension course',
  })
  @IsOptional()
  @IsBoolean()
  allowsExtensionCourse?: boolean;

  @ApiProperty({
    type: Boolean,
    example: true,
    required: false,
    description: 'Affects base salary?',
  })
  @IsOptional()
  @IsBoolean()
  affectsSalary?: boolean;
}

