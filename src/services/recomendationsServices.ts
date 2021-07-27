import {createRecomendationSchema} from '../schemas/newRecomendationSchema'
import getYouTubeID from 'get-youtube-id'; 
import {RecomendationBody} from '../controllers/recomendationsController'

export function validateRecomendation(recomendation:RecomendationBody){
   
    
    if(getYouTubeID(recomendation.youtubeLink) && recomendation.name.length>0) {
        return true
    }else{
        return false
    }
    
    // console.log('passou aqui')
    // if(createRecomendationSchema(body)){
    //     return true
    // }else{
    //     return false
    // }
    

}

export function randomizeArray(array:any[]){
    return array.sort(()=>Math.random()-0.5)
}

export function getAmountNumbersOfRecomendations(array:any[],amount:number){
    array.sort((a,b)=> b.score-a.score)
    
    array.splice(amount)
    
    return array
}

