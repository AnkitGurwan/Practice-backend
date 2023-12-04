import express from 'express';
const app = express();

import session from 'cookie-session';
import passport from 'passport';

//cors
import cors from 'cors';
const corsOptions = {
    origin : 'http://localhost:5173',
    methods : ['GET','POST','UPDATE','DELETE','PATCH'],
    credentials : true
    // allowedHeaders : ['Content-Type','auth-token','Code','Credentials','credentials']
};
app.use(cors(corsOptions));

app.use(session({
    name: 'session',
    keys:["lama"],
    maxAge: 1*60*1000
  }))
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user,cb){
    cb(null,user);
  })
  passport.deserializeUser(function(user,cb){
    cb(null,user);
  })





app.use(express.json());

import Auth from './Views/auth.js';
import Post from './Views/post.js';
import { authLogin } from './Controllers/authController.js';

app.use('/auth',Auth);
app.use('/post',Post);


app.listen(5000, (req,res,err) => {
    if(err){
        console.log(`Error while starting the server : ${err}`);
    }
    else {
        console.log("Server started on the port : 5000");
    }
})