import {test, describe, before, after} from "node:test"
import assert from "node:assert"
import app from "./app.js"


const PORT=4567
const BASE_URL=`http://localhost:${PORT}`

let server




before(async()=>{
    return new Promise((resolve, reject)=>{

        server= app.listen(PORT, ()=>resolve())
        server.on("Error", reject)


    })
})

after(async()=>{
    return new Promise((resolve,reject)=>{
        server.close((err)=>{
            if(err) return reject(err)
            resolve()    
        })

    })
})

describe("GET /users",()=>{
    test("Dene devolver un array y status 200", async()=>{

        const response=await fetch(`${BASE_URL}/users`)
        assert.strictEqual(response.status,200)

        const data = await response.json()

        assert.ok(Array.isArray(data),"Debe de entregar un array")

    })
    
    test("Debe de entregar el nombre y status 200", async()=>{
        const name="gabriel"

        const response=await fetch(`${BASE_URL}/users?name=${name}`)
        assert.strictEqual(response.status, 200)


        const data= await response.json()

        assert.ok( data.every(user=>user.name.toLowerCase().includes(name.toLowerCase())), "debe de entregar el nombre en todos los usuarios encontrados")

    })



})