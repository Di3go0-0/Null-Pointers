import { RegisterDto } from "src/modules/auth/dto";
import { BaseTeacherDTO } from "./base.teacher.dto";
import { IntersectionType } from "@nestjs/swagger";

export class PostTeacherDTO extends IntersectionType(RegisterDto, BaseTeacherDTO) { }
