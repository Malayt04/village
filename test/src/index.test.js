import axios2 from "axios";

const httpURL = "http://localhost:3000"
const wsURL = "ws://localhost:3001"

const axios = {
    post: async (...args) => {
        try {
            const res = await axios2.post(...args)
            return res
        } catch(e) {
            return e.response
        }
    },
    get: async (...args) => {
        try {
            const res = await axios2.get(...args)
            return res
        } catch(e) {
            return e.response
        }
    },
    put: async (...args) => {
        try {
            const res = await axios2.put(...args)
            return res
        } catch(e) {
            return e.response
        }
    },
    delete: async (...args) => {
        try {
            const res = await axios2.delete(...args)
            return res
        } catch(e) {
            return e.response
        }
    },
}


describe("Authentication", ()=>{
    test("User is able to sign up only once", async() => {
        const username = "malay"
        const password = "123456"

        const response = await axios.post(`${httpURL}/api/v1/signup`, {
            username,
            password,
            type: "admin"
        })

        expect(response.status).toBe(200)

        const updatedResponse = await axios.post(`${httpURL}/api/v1/signup`, {
            username,
            password,
            type: "admin"
        })

        expect(updatedResponse).toBe(400)
    })

    test("Signup fails if username is empty", async()=>{
        const username = `malay${Math.random()}`
        const password = 123456

        const response = await axios.post(`${httpURL}/api/v1/signup`, {
            password,
            type: "admin"
        })

        expect(response.status).toBe(200)
        
    })

    test('Signin succeeds if the username and password are correct', async() => {
        const username = `kirat-${Math.random()}`
        const password = "123456"

        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password,
            type: "admin"
        });

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username,
            password
        });

        expect(response.status).toBe(200)
        expect(response.data.token).toBeDefined()
        
    })

    test('Signin fails if the username and password are incorrect', async() => {
        const username = `kirat-${Math.random()}`
        const password = "123456"

        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password,
            role: "admin"
        });

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username: "WrongUsername",
            password
        })

        expect(response.status).toBe(403)
    })
})
