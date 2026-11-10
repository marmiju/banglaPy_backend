import express, { Request, Response } from "express";
import passport from "passport";
import { LogOut } from "../controller/authController/Logout";
import { isLogedIn } from "../middleware/IsLogedIn";
import { GETME } from "../controller/authController/me";

const authRoute = express.Router();

// Start Google login
authRoute.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback URL
authRoute.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: true }),
  (req: Request, res: Response) => {
    const FRONTEND_URL = process.env.FRONTEND_URL;

    // res.redirect(`http://localhost:3000/profile`);
    res.redirect(`${FRONTEND_URL}`);
  }
);

authRoute.get("/me", isLogedIn, GETME);

authRoute.get("/logout", LogOut);

export default authRoute;

