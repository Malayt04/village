import express from 'express'
import { spaceElementSchema, spaceSchema } from '../../types'
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

spaceRouter.get("/:spaceId",async (req, res) => {
    const space = await client.space.findUnique({
        where: {
            id: req.params.spaceId
        },
        include: {
            elements: {
                include: {
                    element: true
                }
            },
        }
    })

    if (!space) {
        res.status(400).json({message: "Space not found"})
        return
    }

    res.json({
        "dimensions": `${space.width}x${space.height}`,
        elements: space.elements.map(e => ({
            id: e.id,
            element: {
                id: e.element.id,
                imageUrl: e.element.imageUrl,
                width: e.element.width,
                height: e.element.height,
                static: e.element.static
            },
            x: e.x,
            y: e.y
        })),
    })
})

spaceRouter.post('/element', async(req, res)=>{

    const parsedData = spaceElementSchema.safeParse(req.body)

    try {
        if(!parsedData.success){
            return res.json({"message":"Please enter details correctly"})
        }

        const {elementId, spaceId, x, y} = parsedData

        const element = await client.element.findOne({
            where:{
                id: elementId
            }
        })

        await client.Space.save({
            where:{
                id: spaceId
            },

            
        })

    } catch (error) {
        
    }
})
