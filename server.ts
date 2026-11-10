import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import passport from "passport";
import session from "express-session";
import "./config/passportSetUp";
import authRoute from "./routers/auth_routes";
import { router } from "./routers/routes";

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.set("trust proxy", 1);

app.use(
  cors({
    origin: ["https://bangla-py.vercel.app", "http://localhost:3000"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const isProduction = process.env.NODE_ENV === "production";

app.use(
  session({
    secret: process.env.SESSION_SECRET || "1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: isProduction ? "none" : "lax",
    },
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.get("/authentication", (req: Request, res: Response) => {
  res.send("authentication deployed");
});

// handlimg routes
app.get("/", (req: Request, res: Response) => {
  res.send("App is running!");
});

app.get("/login", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use("/auth", authRoute);
app.use("/api", router);

app.listen(port, () => {
  console.log(`App running on port localhost:${port}`);
});

