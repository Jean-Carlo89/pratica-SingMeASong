import faker from 'faker'
import supertest from "supertest";
import app from "../../../src/app";
import connection from "../../../src/database";

import {createNewRecomendation,insertNewRecomendation} from '../../factories/recomendations/newRecomendationFactory'

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

    await insertNewRecomendation(body)


    
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

describe("GET /recomendations/top/:amount", ()=>{
  it("Should return 200 if succesfull", async()=>{
    const body = createNewRecomendation()

    await insertNewRecomendation(body)


    const result = await agent.get(`/recomendations/top/${2}`)

    
    expect(result.status).toBe(200)

    expect(result.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id:expect.any(Number),
          youtubeLink:expect.any(String),
          score:expect.any(Number),
          name:expect.any(String)
        })
      ])
    )

  })
})

afterAll(()=>{
  connection.end()
})