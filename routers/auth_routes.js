const express = require('express');
const passport = require('passport');
const { LogOut } = require('../controller/authController/Logout');
const { isLogedIn } = require('../middleware/IsLogedIn');
const { GETME } = require('../controller/authController/me');
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

    // res.redirect(`http://localhost:3000/profile`);
    res.redirect(`${FRONTEND_URL}/profile`);
 
  }
);

authRoute.get('/me',isLogedIn,GETME);

authRoute.get('/logout', LogOut)


module.exports = authRoute;
