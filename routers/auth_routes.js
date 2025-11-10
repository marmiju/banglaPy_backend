const express = require('express');
const passport = require('passport');
const { LogOut } = require('../controller/authController/Logout');
const authRoute = express.Router();

// Start Google login
authRoute.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google callback URL
authRoute.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login',session:true}),
  (req, res) => {
    const FRONTEND_URL = process.env.FRONTEND_URL;

    res.redirect(`${FRONTEND_URL}/profile`);
 
  }
);

authRoute.get('/me', (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not logged in' });
  res.json(req.user);
});

authRoute.get('/logout', LogOut)


module.exports = authRoute;
