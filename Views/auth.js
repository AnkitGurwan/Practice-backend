import express from 'express';
import { authLogin } from '../Controllers/authController.js';

const app =express();
const authRouter = express.Router();

import passport from 'passport';
import FacebookStrategy from 'passport-facebook';


passport.use(new FacebookStrategy({
    clientID: '755210856429092',
    clientSecret : 'e802064618b4a8c58671ba304a93d4d0',
    callbackURL: 'http://localhost:5000/auth/facebook/callback'
    },(accessToken,refreshToken,profile,cb)=>{
        console.log("accessToken",accessToken)
        console.log('\n')
        console.log("refreshToken",refreshToken)
        console.log('\n')
        console.log("profile",profile)
        console.log("profile",cb());
    }))

authRouter.get('/facebook',passport.authenticate('facebook'));


authRouter.get('/facebook/callback',
  passport.authenticate('facebook',{successRedirect : '/',failureRedirect: '/login'}),
  function(req, res) {
    console.log("joker")
    // Successful authentication, redirect home.
    res.redirect('/');
  })

app.get('/login', authLogin)

export default authRouter;