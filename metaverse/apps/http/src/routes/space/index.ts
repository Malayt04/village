import express from 'express'
import { spaceSchema } from '../../types'
import client from '@repo/db/client'
import { userMiddleware } from '../../middleware/user'


export const spaceRouter = express.Router()

spaceRouter.post('/createSpace', async(req, res)=>{
    const parsedData = spaceSchema.safeParse(req.body)

    try {

        if(!parsedData.success){
            return res.status(401).json({"message" : "Please enter correct data"})
        }

        const {name, width, height} = parsedData

        const space = await client.Space.create({
            where:{
                name,
                width, 
                height
            }
        })

        return res.status(200).json(space.id);
    } catch (error) {
        console.log(error)
        return res.status(500).json({"message":"Internal Server error"})
    }
    
})

spaceRouter.delete('/delete/:id', async(req, res) => {
    const spaceId = req.params("id")

    try {
        await client.Space.delete({
            where:{
                id: spaceId
            }
        })

        return res.status(200).json({"message":"Space Deleted Successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({"message":"Internal server error"})
    }
})

spaceRouter.get("/all", userMiddleware, async (req, res) => {
    const spaces = await client.space.findMany({
        where: {
            creatorId: req.userId!
        }
    });

    res.json({
        spaces: spaces.map(s => ({
            id: s.id,
            name: s.name,
            thumbnail: s.thumbnail,
            dimensions: `${s.width}x${s.height}`,
        }))
    })

    
})

