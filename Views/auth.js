import express from 'express';
import passport from 'passport';

import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';
import { authLogin } from '../Controllers/authController.js';


const authRouter = express.Router();
const CLIENT = "http://localhost:5173/main"
const CLIENT2 = "http://localhost:5173/login"


//facebook oauth
passport.use(new FacebookStrategy({
      clientID: '1416859302586325',
      clientSecret : 'faa1af18c16fc7a0c8b78cfc59ad7d15',
      callbackURL: 'http://localhost:5000/auth/facebook/callback'
      },(accessToken,refreshToken,profile,cb)=>{
        // localStorage.setItem('userName',profile.displayName)
          console.log("accessToken",accessToken)
          console.log("refreshToken",refreshToken)
          console.log("profile",profile)
          return cb(null,profile);
      }))

authRouter.get('/facebook',passport.authenticate('facebook',
              {authType: 'reauthenticate',scope:['public_profile','email']}));

authRouter.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: CLIENT, failureRedirect: '/login'}),
  function(req, res) {
    res.redirect('/');
  })
authRouter.get('/facebook/getInfo', authLogin)
authRouter.get('/facebook/logout',(req,res)=>{
    console.log("bfksfb");
    // console.log(req)
    req.logout();
    req.session = null;
    res.redirect(CLIENT2)
})


//google oauth
passport.use(new GoogleStrategy.Strategy({
    clientID: '942514083065-dsc6564h0miqsrp1dvpk21319orv7sst.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:5000/auth/google/callback'
    
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("accessToken",accessToken)
      console.log("refreshToken",refreshToken)
      console.log("profile",profile)
      return done(null,profile);
    }));
authRouter.get('/google',passport.authenticate('google',
              {authType: 'reauthenticate',scope: ['profile', 'email']}));

authRouter.get('/google/callback', passport.authenticate('google', { successRedirect: CLIENT, failureRedirect: '/login'}),
  function(req, res) {
    res.redirect('/');
  })
authRouter.get('/google/getInfo', authLogin)
authRouter.get('/google/logout',(req,res)=>{
    console.log("bfksfb");
    // console.log(req)
    req.logout();
    req.session = null;
    res.redirect(CLIENT2)
})



export default authRouter;