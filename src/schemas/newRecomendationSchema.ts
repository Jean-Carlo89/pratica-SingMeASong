
import Joi from 'joi'

export function createRecomendationSchema(body:object){
   console.log('passou aqui 2')
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        youtubeLink: Joi.string().pattern(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/).required()
      });

      console.log(body)

      if(schema.validate(body)){
        return true 
      }else{
        return false
      }
        
        


       
}