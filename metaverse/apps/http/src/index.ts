import express from 'express'
import { userRouter } from './routes/user'
import dotenv from 'dotenv'
import { adminRouter } from './routes/admin'

dotenv.config()

const app = express()

const port = 3000

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Helo");
})

app.use("/api/v1", userRouter)
app.use("/api/v1/admin", adminRouter)
app.listen(port, ()=> {
    console.log(`Server is running in port ${port}`)
})
