import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, Max, Min } from "class-validator";

export class GetContractTypesDto {
  @ApiProperty({
    type: Number,
    example: 1,
    minimum: 1,
    maximum: 999999999,
    required: false,
    description: 'Contract type id',
  })
  @IsOptional()
  @IsInt({ message: 'Contract type id must be an integer' })
  @Min(1, { message: 'Contract type id must be greater than 0' })
  @Max(999999999, { message: 'Contract type id must be less than 1000000000' })
  id: number;
}
