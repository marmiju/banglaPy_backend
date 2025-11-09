const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { PrismaClient } = require('@prisma/client')
// =============
require('dotenv').config();

const prisma = new PrismaClient()

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL:
        process.env.NODE_ENV === "production"
          ? "https://bangla-py-backend.vercel.app/auth/google/callback"
          : "http://localhost:5000/auth/google/callback",

    },
    (accessToken, refreshToken, profile, done) => {
      const createUser = async () => {

        const exUser = await prisma.user.findUnique({
          where: { email: profile.emails[0].value }
        })
        if (exUser) {
          return done(null, exUser)
        }

        const new_user = await prisma.user.create({
          data: {
            email: profile.emails[0].value,
            googleId: profile.id,
            username: profile.displayName,
            profile_picture: profile.photos[0].value
          }
        })
        return done(null, new_user)
      }
      createUser()

    },
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));



