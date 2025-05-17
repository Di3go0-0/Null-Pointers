import { PartialType } from "@nestjs/swagger";
import { PostTeacherDTO } from "./post.teacher.dto";

export class PatchTeacherDTO extends PartialType(PostTeacherDTO) { }
