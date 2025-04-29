import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class PatchContractsTypesDto {
  @ApiProperty({
    type: String,
    example: 'Contrato Termino Fijo',
    required: false,
    description: 'Tipo De Contrato',
  })
  @IsOptional()
  @IsString()
  typeName?: string;

  @ApiProperty({
    type: String,
    example: 'Descripcion del contrato',
    required: false,
    description: 'Descripcion del contrato',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: Boolean,
    example: true,
    required: false,
    description: 'Habilitado para curso de extension',
  })
  @IsOptional()
  @IsBoolean()
  allowsExtensionCourse?: boolean;

  @ApiProperty({
    type: Boolean,
    example: true,
    required: false,
    description: 'Afecta salario base?',
  })
  @IsOptional()
  @IsBoolean()
  affectsSalary?: boolean;
}

