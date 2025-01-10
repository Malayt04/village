import express from 'express'
import client from '@repo/db/client'
import { CreateAvatarSchema, createElementSchema, CreateMapSchema, UpdateElementSchema } from '../../types'
import { adminMiddleware } from '../../middleware/admin'

export const adminRouter = express.Router()


adminRouter.post('/element', adminMiddleware, async(req, res)=>{
    const parsedData = createElementSchema.safeParse(req.body)

    try {
        if(!parsedData.success){
            return res.json({"message":"Give correct Data"})
        }

        const element = await client.Element.create({
            data:{
                width: parsedData.data.width,
                height: parsedData.data.height,
                static: parsedData.data.static,
                imageUrl: parsedData.data.imageUrl,
            }
            })        
        return res.json({
            id: element.id
        })
    } catch (error) {
        console.log(error)
        return res.json({"message":"Internal Server error"})
    }

})


adminRouter.put("/element/:elementId", adminMiddleware, (req, res) => {
    const parsedData = UpdateElementSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json({message: "Validation failed"})
        return
    }
    client.element.update({
        where: {
            id: req.params.elementId
        },
        data: {
            imageUrl: parsedData.data.imageUrl
        }
    })
    res.json({message: "Element updated"})
})

adminRouter.post("/avatar",adminMiddleware, async (req, res, next) => {
   try {

    console.log("admin avatar route")
    
     const parsedData = CreateAvatarSchema.safeParse(req.body)
 
     console.log(parsedData)
 
     if (!parsedData.success) {
         res.status(400).json({message: "Validation failed"})
         return
     }
 
     const {name, imageUrl} = parsedData.data
 
     const avatar = await client.avatar.create({
         data: {
             name,
             imageUrl
         }
     })
 
     console.log(avatar.id)
     res.json({avatarId: avatar.id})
   } catch (error) {
         console.log(error)
         res.status(500).json({message: "Internal server error"})
         next(error)
   }
})

adminRouter.post("/map", adminMiddleware,async (req, res) => {
    const parsedData = CreateMapSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json({message: "Validation failed"})
        return
    }
    const map = await client.map.create({
        data: {
            name: parsedData.data.name,
            width: parseInt(parsedData.data.dimensions.split("x")[0]),
            height: parseInt(parsedData.data.dimensions.split("x")[1]),
            thumbnail: parsedData.data.thumbnail,
            mapElements: {
                create: parsedData.data.defaultElements.map(e => ({
                    elementId: e.elementId,
                    x: e.x,
                    y: e.y
                }))
            }
        }
    })

    res.json({
        id: map.id
    })
})