import {Request,response,Response} from "express"

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

export async function Vote(req:Request,res:Response){
    //console.log(req.params)
    console.log(req.path)
    let operator;
    if(req.path.includes('upvote')){
        operator='+'
    }

    if(req.path.includes('downvote')){
        operator='-'
    }
    
    try{
        const insertResult = await recomendationsRepositories.updateScore(Number(req.params.id),operator)

        if(!insertResult){
            return res.status(400).send('Esta recomendção não existe')
           
        }

        res.sendStatus(200)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

export async function getRandom(req:Request,res:Response){

    try{
        const response = await recomendationsRepositories.getRandom()

        if(response==404){
            res.sendStatus(404)
            return
        }
        
        
        res.status(200).send(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
        
    }

}

export async function getTop(req:Request,res:Response){
    console.log(req.params)

    const {amount} = req.params

    try{
        const searchTop = await recomendationsRepositories.getTop(Number(amount))
        return
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
    
}

