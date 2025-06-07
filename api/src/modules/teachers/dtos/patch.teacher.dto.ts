import { ApiProperty, PartialType } from "@nestjs/swagger";
import { BaseTeacherDTO } from "./base.teacher.dto";
import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class PatchTeacherDTO extends PartialType(BaseTeacherDTO) {
  @ApiProperty({
    type: String,
    example: 'Pepito',
    required: true,
    description: 'Nombre del usuario',
  })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser un texto' })
  name: string;

  @ApiProperty({
    type: String,
    example: 'usuario@correo.com',
    required: true,
    description: 'Correo electrónico del usuario',
  })
  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'Debe ingresar un email válido' })
  email: string;
}
