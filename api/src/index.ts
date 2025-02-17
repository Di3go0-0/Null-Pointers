import app from "./app";
import dotenv from "dotenv";
import { setupSwagger } from "./swagger";
import type { NextFunction, Response, Request } from "express";

dotenv.config();

const PORT = process.env.PORT || 3000;

setupSwagger(app);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Endpoint Not found" });
  next();
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
