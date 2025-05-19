import { PartialType } from "@nestjs/swagger";
import { ApiProperty } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";
import { IsEnum, IsOptional } from "class-validator";
import { PostExtensionInstanceDto } from "./post.extension-instances.dto";

export class PatchExtensionInstanceDto extends PartialType(PostExtensionInstanceDto) {
  @ApiProperty({
    description: 'The status of the course instance',
    enum: $Enums.ExtensionPublicationStatus,
    required: false,
    example: $Enums.ExtensionPublicationStatus.Draft,
  })
  @IsEnum($Enums.ExtensionPublicationStatus)
  @IsOptional()
  publicationStatus?: $Enums.ExtensionPublicationStatus;
}

