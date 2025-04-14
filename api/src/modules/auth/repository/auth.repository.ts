import { RegisterType } from "../types";

export abstract class AuthRepository {
  abstract registerRequest(body: RegisterType): Promise<boolean>;
}
