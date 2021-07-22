import express from "express";
import cors from "cors";

import * as recomendationsController from './controllers/recomendationsController'
const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("OK!");
});

app.post("/recomendations", recomendationsController.addRecomendation)

app.post("/recomendations:id/upvote",recomendationsController.upVote)

app.post("/recomendations:id/downvote",recomendationsController.downVote)

    

export default app;
