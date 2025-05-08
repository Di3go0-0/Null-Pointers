import { ApiProperty, PartialType } from '@nestjs/swagger';
import { PostCoursesDto } from './post.courses.dto';

export class PatchCoursesDto extends PartialType(PostCoursesDto) {
}
