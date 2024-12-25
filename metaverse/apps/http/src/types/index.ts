import {z} from 'zod'

export const signUpSchema = z.object({
    username: z.string(),
    password: z.string(),
    type: z.enum(["user","admin"])
}) 

export const signInSchema = z.object({
    username: z.string(),
    password: z.string()
})

export const metaDataSchema = z.object({
    avatarId: z.string(),
})

export const spaceSchema = z.object({
    name: z.string(),
    height: z.number(),
    width: z.number()
})

declare global {
    namespace Express {
      export interface Request {
        role?: "Admin" | "User";
        userId?: string;
      }
    }
}