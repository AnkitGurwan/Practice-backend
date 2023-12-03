import express from "express";
import { contentGenerate } from "../Controllers/postController.js";

const postRouter = express.Router();

postRouter.post('/getDesc',contentGenerate);

export default postRouter;