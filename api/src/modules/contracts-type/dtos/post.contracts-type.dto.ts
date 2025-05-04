import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateContractsTypesDto {
  @ApiProperty({
    type: String,
    example: 'Fixed Term Contract',
    required: true,
    description: 'Contract Type',
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  typeName: string;

  @ApiProperty({
    type: String,
    example: 'Contract description',
    required: true,
    description: 'Contract description',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    type: Boolean,
    example: true,
    required: true,
    description: 'Enables extension course',
  })
  @IsNotEmpty()
  @IsBoolean()
  allowsExtensionCourse: boolean;

  @ApiProperty({
    type: Boolean,
    example: true,
    required: true,
    description: 'Affects base salary?',
  })
  @IsNotEmpty()
  @IsBoolean()
  affectsSalary: boolean;
}
