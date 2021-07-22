import {Request,Response} from "express"
import {validateRecomendation} from '../services/recomendationsServices'
export function addRecomendation(req:Request,res:Response){
    //console.log(req.body)
    if(validateRecomendation(req.body)){
        res.status(200).send('Verificou')
    }else{
        res.status(400).send('Não Verificou')
    }
    
    
}