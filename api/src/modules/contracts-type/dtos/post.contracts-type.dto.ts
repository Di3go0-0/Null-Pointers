import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateContractsTypesDto {
  @ApiProperty({
    type: String,
    example: 'Contrato Termino Fijo',
    required: true,
    description: 'Tipo De Contrato',
  })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString()
  typeName: string;

  @ApiProperty({
    type: String,
    example: 'Descripcion del contrato',
    required: true,
    description: 'Descripcion del contrato',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    type: Boolean,
    example: true,
    required: true,
    description: 'Habilitado para curso de extension',
  })
  @IsNotEmpty()
  @IsBoolean()
  allowsExtensionCourse: boolean;

  @ApiProperty({
    type: Boolean,
    example: true,
    required: true,
    description: 'Afecta salario base?',
  })
  @IsNotEmpty()
  @IsBoolean()
  affectsSalary: boolean;
}
