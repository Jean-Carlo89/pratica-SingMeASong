import {Request,Response} from "express"

import {validateRecomendation} from '../services/recomendationsServices'

import * as recomendationsRepositories from '../repositories/recomendationsRepositories'

export async function addRecomendation(req:Request,res:Response){
   try{

        if(!validateRecomendation(req.body)){
            return res.status(400).send('Não Verificou')
        }
       
        await recomendationsRepositories.saveNewRecomendation(req.body)
        
       res.sendStatus(200)
        
    }catch(e){
        res.sendStatus(500)
        console.log(e)
    }
   
}

export async function upVote(req:Request,res:Response){
    //console.log(req.params)
    try{
        await recomendationsRepositories.updateScore(Number(req.params.id),'+')

        res.sendStatus(200)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

export async function downVote(req:Request,res:Response){
    //console.log(req.params)
    try{
        await recomendationsRepositories.updateScore(Number(req.params.id),'-')

        res.sendStatus(200)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}
   
   