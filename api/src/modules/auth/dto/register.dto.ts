import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { Match } from "src/shared";

export class RegisterDto {
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

  @ApiProperty({
    type: String,
    example: 'Password123!',
    required: true,
    description: 'Contraseña del usuario',
  })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña debe contener al menos una mayúscula, minúscula y un número o caracter especial',
  })
  password: string;

  @ApiProperty({
    type: String,
    example: 'Password123!',
    required: true,
    description: 'Confirmación de contraseña',
  })
  @IsNotEmpty({ message: 'La confirmación de contraseña es requerida' })
  @Match('password', { message: 'Las contraseñas no coinciden' })
  confirmPassword: string;

  // @ApiProperty({
  //   type: Number,
  //   example: 12345678,
  //   required: true,
  //   description: 'Número de identificación del usuario',
  // })
  // @IsNotEmpty({ message: 'El número de identificación es requerido' })
  // @IsInt({ message: 'El número de identificación debe ser un número entero' })
  // identificationNumber: number;
}
