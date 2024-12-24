import express from 'express'
import { signUpSchema } from '../../types'

export const userRouter = express.Router()

userRouter.post('/signup', async(req,res)=>{
    const parsedData = signUpSchema.safeParse(req.body)

    try {
        
    } catch (error) {
        return res.json({"message": error.message})
    }
})