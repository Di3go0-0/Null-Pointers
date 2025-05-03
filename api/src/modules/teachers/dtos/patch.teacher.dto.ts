import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator";

export class PatchTeacherDTO {
  @ApiProperty({
    type: Number,
    example: 1,
    required: false,
    description: 'Id de tipo de contrato',
  })
  @IsOptional()
  @IsNumber()
  contractTypeId: number;

  @ApiProperty({
    type: String,
    example: 'Matemáticas',
    required: false,
    description: 'Especialidad del profesor',
  })
  @IsOptional()
  @IsString({ message: 'La especialidad debe ser un texto' })
  specialty: string;

  @ApiProperty({
    type: String,
    example: 'Más de 5 años enseñando matemáticas avanzadas en universidades públicas y privadas',
    required: false,
    description: 'Descripción detallada de la experiencia profesional y académica del profesor',
  })
  @IsOptional()
  @IsString()
  experience: string;

  @ApiProperty({
    type: Number,
    example: 5000000.50,
    required: false,
    description: 'Salario base del profesor',
  })
  @IsOptional()
  @IsNotEmpty({ message: 'El salario base es requerido' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El salario debe ser un número con máximo 2 decimales' })
  baseSalary: number;
}
