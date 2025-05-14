import { DayOfWeek } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNumber, IsString, Max, Min } from "class-validator";

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
    example: DayOfWeek.Monday,
  })
  @IsString()
  day: DayOfWeek;


  @ApiProperty({
    description: 'Start hour of the class (0-24)',
    example: 16,
    minimum: 0,
    maximum: 23,
    type: Number,
  })
  @IsInt()
  @Min(0)
  @Max(23)
  startTime: number;

  @ApiProperty({
    description: 'End hour of the class (0-24)',
    example: 18,
    minimum: 0,
    maximum: 23,
    type: Number,
  })
  @IsInt()
  @Min(0)
  @Max(23)
  endTime: number;

  @ApiProperty({
    description: 'The classroom where the class takes place',
    example: 'Room A101',
    type: String,
  })
  @IsString()
  classroom: string;
}
