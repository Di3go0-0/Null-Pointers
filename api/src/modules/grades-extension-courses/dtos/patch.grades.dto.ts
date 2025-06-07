import { IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PatchGradesDto {
  @ApiPropertyOptional({ description: 'First term grade' })
  @IsOptional()
  @IsNumber()
  term1_grade?: number;

  @ApiPropertyOptional({ description: 'Second term grade' })
  @IsOptional()
  @IsNumber()
  term2_grade?: number;

  @ApiPropertyOptional({ description: 'Third term grade' })
  @IsOptional()
  @IsNumber()
  term3_grade?: number;

  @ApiPropertyOptional({ description: 'Final grade' })
  @IsOptional()
  @IsNumber()
  final?: number;
}
