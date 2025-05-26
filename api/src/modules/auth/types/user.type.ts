import { $Enums } from "@prisma/client";
import { personalInfoType } from "./personalInfo.type";

export type userType = {
  name: string;
  email: string;
  role: {
    roleName: $Enums.RoleName;
  } | null;
  personalInfo: personalInfoType | null;
}
