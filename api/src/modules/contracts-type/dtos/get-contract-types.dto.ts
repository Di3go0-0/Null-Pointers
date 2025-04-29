import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, Max, Min } from "class-validator";

export class GetContractTypesDto {
  @ApiProperty({
    type: Number,
    example: 1,
    minimum: 1,
    maximum: 999999999,
    required: false,
    description: 'Id del tipo de contrato',
  })
  @IsOptional()
  @IsInt({ message: 'El id del typo de dontrato ser un número entero' })
  @Min(1, { message: 'El id de la area funcional debe ser mayor a 0' })
  @Max(999999999, { message: 'El id de la area funcional debe ser menor a 1000000000' })
  id: number;
}
