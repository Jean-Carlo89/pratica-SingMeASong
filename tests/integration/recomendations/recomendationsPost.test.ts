import supertest from 'supertest'
import app from '../../../src/app'
import connection from '../../../src/database'
import faker from 'faker'

import {createNewRecomendation,getId} from '../../factories/recomendations/newRecomendationFactory'

beforeEach(async()=>{
    await connection.query(`DELETE FROM recomendations`)
})
const agent = supertest(app)

describe("POST/recomendations",()=>{
    it("returns 200 if succesful insert of new recomendation",async ()=>{
       const recomendation = createNewRecomendation()

      

        const result = await agent.post("/recomendations").send(recomendation)

        expect(result.status).toEqual(200)
    })
})

describe("POST/recomendation:id/upvote",()=>{
    it("should return 200 if upvote succesfull", async()=>{
        
        const recomendation = createNewRecomendation()

        const id = await getId(recomendation)
        
        const result = await agent.post(`/recomendations${id}/upvote`)

        expect(result.status).toEqual(200)
    })

    it("should return 400 if id does not exist", async()=>{
        
        const recomendation = createNewRecomendation()

        const id = await getId(recomendation)
        
        const result = await agent.post(`/recomendations${id+1}/upvote`)

        expect(result.status).toEqual(400)
    })
})

describe("POST/recomendation:id/downvote",()=>{
    it("should return 200 if downvote succesfull", async()=>{
        
        const recomendation = createNewRecomendation()

       const id = await getId(recomendation)
       
        const result = await agent.post(`/recomendations${id}/downvote`)

         expect(result.status).toEqual(200)
    })

    it("should return 400 if id does not exist", async()=>{
        
        const recomendation = createNewRecomendation()

        const id = await getId(recomendation)
        
        const result = await agent.post(`/recomendations${id+1}/downvote`)

        expect(result.status).toEqual(400)
    })
})

afterAll(()=>{
    connection.end()
})