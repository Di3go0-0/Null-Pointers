import { ApiProperty, PartialType } from "@nestjs/swagger";
import { BaseTeacherDTO } from "./base.teacher.dto";
import { IsNotEmpty, IsString, IsEmail, IsOptional } from "class-validator";

export class PatchTeacherDTO extends PartialType(BaseTeacherDTO) {
  @ApiProperty({
    type: String,
    example: 'Pepito',
    required: false,
    description: 'Nombre del usuario',
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser un texto' })
  name?: string;

  @ApiProperty({
    type: String,
    example: 'usuario@correo.com',
    required: false,
    description: 'Correo electrónico del usuario',
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsEmail({}, { message: 'Debe ingresar un email válido' })
  email?: string;
}
