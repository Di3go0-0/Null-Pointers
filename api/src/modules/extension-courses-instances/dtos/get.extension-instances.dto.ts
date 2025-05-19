import { ApiProperty } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetByStatusExtensionInstancesDto {
  @ApiProperty({
    description: 'The id of the course instance',
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'The teacher id associated with the course instance',
    example: 123,
    required: false
  })
  @IsOptional()
  @IsNumber()
  teacherId: number;

  @ApiProperty({
    description: 'The course id associated with this instance',
    example: 456,
    required: false
  })
  @IsOptional()
  @IsNumber()
  extensionCourseId: number;

  @ApiProperty({
    description: 'The status of the course extension instance',
    enum: $Enums.ExtensionPublicationStatus,
    required: false,
    example: $Enums.ExtensionPublicationStatus.Draft
  })
  @IsString()
  @IsOptional()
  publicationStatus: $Enums.ExtensionPublicationStatus;
}
