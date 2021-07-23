import { number, string } from "joi";
import supertest from "supertest";
import app from "../../../src/app";
import connection from "../../../src/database";

import {createNewRecomendation} from '../../factories/recomendations/newRecomendationFactory'

beforeEach(async()=>{
  await connection.query(('DELETE FROM recomendations'))
})

const agent = supertest(app)

describe("GET /random", () => {
  it("should return 404 if there are no recomendations stored", async () => {
    
    const result = await agent.get("/recomendations/random")

    expect(result.status).toBe(404)
  });

  it("should return 200 if request is succesfull" , async () => {
    
    const body = createNewRecomendation();

    await connection.query(`INSERT INTO recomendations (name,"youtubeLink",score) VALUES($1,$2,0)`,[body.name,body.youtubeLink])


    
    const result = await agent.get("/recomendations/random")
      
    expect(result.status).toBe(200)

    expect(result.body).toEqual(
      
        expect.objectContaining({
          id:expect.any(Number),
          youtubeLink:expect.any(String),
          score:expect.any(Number),
          name:expect.any(String)
  
        })
      
     
    )
  });
});

afterAll(()=>{
  connection.end()
})