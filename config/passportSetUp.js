const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL:
      process.env.NODE_ENV === "production"
        ? "https://banglapy-backend.onrender.com/auth/google/callback"
        : "http://localhost:5000/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email: profile.emails[0].value }
      });
      if (existingUser) return done(null, existingUser);

      const newUser = await prisma.user.create({
        data: {
          email: profile.emails[0].value,
          googleId: profile.id,
          username: profile.displayName,
          profile_picture: profile.photos[0].value
        }
      });
      done(null, newUser);
    } catch (error) {
      done(error, null);
    }
  }
));

// ✅ Serialize only user ID
passport.serializeUser((user, done) => done(null, user.id));

// ✅ Deserialize: rebuild req.user from DB
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
