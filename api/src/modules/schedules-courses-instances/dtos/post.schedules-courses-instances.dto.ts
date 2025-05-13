import { DayOfWeek } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";

export class PostScheduleDto {
  @ApiProperty({
    description: 'The ID of the course instance',
    example: 1,
    type: Number,
  })
  @IsNumber()
  courseInstanceId: number;

  @ApiProperty({
    description: 'The day of the week when the class takes place',
    enum: DayOfWeek,
    example: 'MONDAY',
  })
  @IsString()
  day: DayOfWeek;

  @ApiProperty({
    description: 'The start time of the class',
    example: '2023-01-01T08:00:00Z',
    type: Date,
  })
  @IsDate()
  startTime: Date;

  @ApiProperty({
    description: 'The end time of the class',
    example: '2023-01-01T10:00:00Z',
    type: Date,
  })
  @IsDate()
  endTime: Date;

  @ApiProperty({
    description: 'The classroom where the class takes place',
    example: 'Room A101',
    type: String,
  })
  @IsString()
  classroom: string;
}
