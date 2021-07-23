import {createRecomendationSchema} from '../schemas/newRecomendationSchema'
import getYouTubeID from 'get-youtube-id'; 

export function validateRecomendation(body:{name:string, youtubeLink:string}){
   
    console.log('passou aqui')
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

// export function randomize(){
//     math
// }