import express from "express";
import cors from "cors";
import {Request,Response} from "express"
import * as recomendationsController from './controllers/recomendationsController'
const app = express();
app.use(cors());
app.use(express.json());



app.post("/recomendations", recomendationsController.addRecomendation)

app.post("/recomendations:id/upvote",recomendationsController.Vote)

app.post("/recomendations:id/downvote",recomendationsController.Vote)

app.get("/recomendations/random",recomendationsController.getRandom)

app.get("/recomendations/top/:amount", recomendationsController.getTop)

export default app;
