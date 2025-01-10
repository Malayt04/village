import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import client from '@repo/db/client'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { metaDataSchema, signInSchema, signUpSchema } from '../../types';
import { userMiddleware } from '../../middleware/user';
import { JWT_SECRET } from '../../config';


dotenv.config();

export const userRouter = express.Router();

userRouter.post('/signup', async (req: Request, res: Response) => {
    const parsedData = signUpSchema.safeParse(req.body);
    console.log(parsedData);


    if (!parsedData.success) {
        return res.status(400).json({ 
            message: "Validation Failed", 
            errors: parsedData.error.errors 
        });
    }

    const { username, password, role } = parsedData.data;

    try {
        const existingUser = await client.user.findUnique({ 
            where: { username }
         });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await client.user.create({
            data:  {
                username, 
                password : hashedPassword, 
                role
            }  
             });

        return res.status(200).json({ message: "User Signed Up Successfully" });

    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

userRouter.post('/signin', async (req: Request, res: Response) => {
    const parsedData = signInSchema.safeParse(req.body);

    try {
        if (!parsedData.success) {
            return res.status(403).json({ "message": "Please enter credentials correctly" });
        }

        const { username, password } = parsedData.data;

        const user = await client.user.findUnique({
            where: {
                username
            }
        });

        if (!user) {
            return res.status(403).json({ "message": "User not found" });
        }

        const isValid = bcrypt.compareSync(password, user.password);

        if (!isValid) {
            return res.status(403).json({ "message": "Invalid Password" });
        }

        const jwtSecret = JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({ "message": "Internal server error: JWT secret is not defined" });
        }

        const token = jwt.sign({
            userId: user.id,
            role: user.role
        }, jwtSecret, { expiresIn: '1h' });

        return res.status(200).json({ token });

    } catch (error) {
        console.log(error);
        return res.json({ "message": "Unable to Sign In" });
    }
});

userRouter.post('/metadata', userMiddleware, async(req, res, next)=>{
        const parsedData = metaDataSchema.safeParse(req.body);

        try {

            if (!parsedData.success) {
                return res.status(400).json({ "message": "Invalid data" });
            }

            const userId = req.userId;

            const { avatarId } = parsedData.data;

             const user = await client.user.findUnique({
                where: {
                    id: userId
                }
             })

            if (!user) {
                return res.status(400).json({ "message": "Unathorized Access" });
            }

            const isValidAvatarId = await client.avatar.findUnique({
                where: {
                    id: avatarId
                }
            })

            if(!isValidAvatarId){
                return res.status(404).json({ "message": "Avatar not found" });
            }

            user.avatarId = avatarId;

            await client.user.update({
                where: {
                    id: userId
                },
                data: {
                    avatarId
                }
            });

            return res.status(200).json(avatarId);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ "message": "Internal server error" });
        }
})