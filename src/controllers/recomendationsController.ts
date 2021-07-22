import {Request,Response} from "express"

export function addRecomendation(req:Request,res:Response){
    console.log(req.body)
    res.sendStatus(200)
}