import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostParentsInfoDto {
  @ApiProperty({
    description: 'Relationship type between the parent and the student',
    example: 'Father',
    required: true,
  })
  @IsNotEmpty({ message: 'Relationship is required' })
  @IsString({ message: 'Relationship must be a string' })
  relationship: string;

  @ApiProperty({
    description: 'Full name of the parent or guardian',
    example: 'John Smith',
    required: true,
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    description: 'Contact phone number of the parent',
    example: '+12125551234',
    required: true,
  })
  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString({ message: 'Phone number must be a string' })
  phoneNumber: string;
}
