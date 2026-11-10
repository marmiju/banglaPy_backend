import { PrismaClient, User as PrismaUser } from "@prisma/client";
import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";

const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID || "",
      clientSecret: process.env.CLIENT_SECRET || "",
      callbackURL:
        process.env.NODE_ENV === "production"
          ? "https://banglapy-backend.onrender.com/auth/google/callback"
          : "http://localhost:5000/auth/google/callback",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: any) => void
    ) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return done(new Error("No email found in Google profile"), undefined);
        }

        const existingUser = await prisma.user.findUnique({
          where: { email },
        });
        if (existingUser) return done(null, existingUser);

        const newUser = await prisma.user.create({
          data: {
            email,
            googleId: profile.id,
            username: profile.displayName,
            profile_picture: profile.photos?.[0]?.value || "",
          },
        });
        done(null, newUser);
      } catch (error) {
        done(error, undefined);
      }
    }
  )
);

// ✅ Serialize only user ID
passport.serializeUser((user: Express.User, done) => done(null, (user as PrismaUser).id));

// ✅ Deserialize: rebuild req.user from DB
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;

