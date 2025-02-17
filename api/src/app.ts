import express from "express";
import * as routes from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

const clientURL = process.env.CLIENT_URL as string;

const app = express();
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

routes.AuthRoutes(app);

export default app;
