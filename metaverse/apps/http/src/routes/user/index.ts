import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import client from '@repo/db/client'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { metaDataSchema, signInSchema, signUpSchema } from '../../types';
import { userMiddleware } from '../../middleware/user';


dotenv.config();

export const userRouter = express.Router();

userRouter.post('/signup', async (req: Request, res: Response) => {
    const parsedData = signUpSchema.safeParse(req.body);

    try {
        if (!parsedData.success) {
            return res.status(400).json({ "message": "Unable to Sign Up" });
        }

        const { username, password, type } = parsedData.data;

        const hashedPassword = bcrypt.hashSync(password, 10);

        await client.user.save({ username, hashedPassword, type });

        return res.status(200).json({ "message": "User Signed Up Successfully" });

    } catch (error) {
        console.log(error);
        return res.json({ "message": "Unable to Sign Up" });
    }
});

userRouter.post('/signin', async (req: Request, res: Response) => {
    const parsedData = signInSchema.safeParse(req.body);

    try {
        if (!parsedData.success) {
            return res.json({ "message": "Please enter credentials correctly" });
        }

        const { username, password } = parsedData.data;

        const user = await client.user.findOne({
            where: {
                username
            }
        });

        if (!user) {
            return res.json({ "message": "User not found" });
        }

        const isValid = bcrypt.compareSync(password, user.password);

        if (!isValid) {
            return res.json({ "message": "Invalid Password" });
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({ "message": "Internal server error: JWT secret is not defined" });
        }

        const token = jwt.sign({
            userId: user.id
        }, jwtSecret, { expiresIn: '1h' });

        return res.status(200).json({ token });

    } catch (error) {
        console.log(error);
        return res.json({ "message": "Unable to Sign In" });
    }
});

userRouter.post('/metadata', userMiddleware, async(req, res)=>{
        const parsedData = metaDataSchema.safeParse(req.body);

        try {

            if (!parsedData.success) {
                return res.status(400).json({ "message": "Invalid data" });
            }

            const userId = req.userId;

            const { avatarId } = parsedData.data;

             const user = await client.user.findOne({
                where: {
                    id: userId
                }
             })

            if (!user) {
                return res.status(404).json({ "message": "User not found" });
            }

            user.avatarId = avatarId;

            await client.user.save(user);

            return res.status(200).json(avatarId);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ "message": "Internal server error" });
        }
})