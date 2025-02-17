import { Router } from "express";
import { userToken as userToken, validateSchema } from "../middleware";
import { login, logout, register, users, validateUser } from "../controllers";
import { registerSchema, loginSchema } from "../schemas";
import { Role } from "@prisma/client";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", userToken([Role.admin, Role.teacher, Role.student]), logout);
router.post("/validate", userToken([Role.admin, Role.teacher, Role.student]), validateUser);
router.get("/users", userToken([Role.admin]), users)

export const AuthRoutes = (app: any) => {
  app.use("/", router);
};
