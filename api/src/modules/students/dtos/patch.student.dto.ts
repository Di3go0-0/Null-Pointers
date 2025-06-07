import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";

export class PatchStudentDto {
  @ApiProperty({
    description: 'The name of the student.',
    example: 'John Doe',
    required: false,
  })
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'The email address of the student.',
    example: 'john.doe@example.com',
    required: false,
  })
  @IsEmail()
  @IsString()
  email?: string;
}
