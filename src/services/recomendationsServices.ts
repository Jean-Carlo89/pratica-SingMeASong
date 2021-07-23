import {createRecomendationSchema} from '../schemas/newRecomendationSchema'
import getYouTubeID from 'get-youtube-id'; 

export function validateRecomendation(body:{name:string, youtubeLink:string}){
   
    
    if(getYouTubeID(body.youtubeLink) && body.name.length>0) {
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

