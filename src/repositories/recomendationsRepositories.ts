import connection from '../database'

export async function saveNewRecomendation(body:{name:string,youtubeLink:string}){

    const{name,youtubeLink} = body
    
      await connection.query(`INSERT INTO recomendations (name,"youtubeLink",score) VALUES ($1,$2,0)`,[name,youtubeLink])

   
    
}

export async function updateScore(number:number,type:string) {
    console.log(number)
    console.log(type)
    console.log(typeof(type))
    
    await connection.query(`
        UPDATE recomendations
        SET score = score ($2) 1 
        WHERE id=($2)
        `,[type,number])

 }
    