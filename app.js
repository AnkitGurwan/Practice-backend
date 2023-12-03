import express from 'express';
const app = express();


//cors
import cors from 'cors';
const corsOptions = {
    origin : 'http://localhost:5173',
    methods : ['GET','POST','UPDATE','DELETE','PATCH'],
    allowedHeaders : ['Content-Type','auth-token','Code']
};
app.use(cors(corsOptions));

app.use(express.json());

import Auth from './Views/auth.js';
import Post from './Views/post.js';
import { authLogin } from './Controllers/authController.js';

app.use('/auth',Auth);
app.use('/post',Post);
app.get('/login',authLogin);


app.listen(5000, (req,res,err) => {
    if(err){
        console.log(`Error while starting the server : ${err}`);
    }
    else {
        console.log("Server started on the port : 5000");
    }
})