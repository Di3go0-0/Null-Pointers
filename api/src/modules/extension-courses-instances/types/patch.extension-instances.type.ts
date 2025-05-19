import { $Enums } from "@prisma/client";
import { PostExtensionInstanceType } from "./post.extension-instances.type";

export type PatchCourseInstanceType = Partial<PostExtensionInstanceType> & {
  publicationStatus?: $Enums.ExtensionPublicationStatus;
}

