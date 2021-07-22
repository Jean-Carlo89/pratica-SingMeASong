import {Request,Response} from "express"
import {validateRecomendation} from '../services/recomendationsServices'

import * as recomendationsRepositories from '../repositories/recomendationsRepositories'

export async function addRecomendation(req:Request,res:Response){
    //console.log(req.body)
   try{

        if(!validateRecomendation(req.body)){
            res.status(400).send('Não Verificou')
        }
       
        await recomendationsRepositories.saveNewRecomendation(req.body)
        
       res.sendStatus(200)
        
    }catch(e){
        res.sendStatus(500)
        console.log(e)
    }
   
    

  
    
    
}