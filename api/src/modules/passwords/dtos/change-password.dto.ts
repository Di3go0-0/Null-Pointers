import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Match } from "src/shared";

export class ChangePasswordDto {
  @ApiProperty({
    type: String,
    example: 'Password123!',
    required: true,
    description: 'Contraseña del usuario',
  })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  oldPassword: string;

  @ApiProperty({
    type: String,
    example: 'Password1234!',
    required: true,
    description: 'Contraseña del usuario',
  })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string;

  @ApiProperty({
    type: String,
    example: 'Password1234!',
    required: true,
    description: 'Confirmación de contraseña',
  })
  @IsNotEmpty({ message: 'La confirmación de contraseña es requerida' })
  @Match('password', { message: 'Las contraseñas no coinciden' })
  confirmPassword: string;
}
