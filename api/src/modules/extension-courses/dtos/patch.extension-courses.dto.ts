import { PartialType } from '@nestjs/swagger';
import { PostExtensionCoursesDto } from './post.extension-courses.dto';

export class PatchExtensionCoursesDto extends PartialType(PostExtensionCoursesDto) {
}
