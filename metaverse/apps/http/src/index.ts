import express from 'express'
import { userRouter } from './routes/user'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const port = 3000

app.get("/", (req, res) => {
    res.send("Helo");
})

app.use("/api/v1", userRouter)
app.listen(port, ()=> {
    console.log(`Server is running in port ${port}`)
})
