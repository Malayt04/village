import {z} from 'zod'

export const signUpSchema = z.object({
    username: z.string(),
    password: z.string(),
    role: z.enum(["User","Admin"])
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

export const spaceElementSchema = z.object({
    elementId: z.string(),
    spaceId: z.string(),
    x: z.number(),
    y: z.number()
})

export const createElementSchema = z.object({
    imageUrl: z.string(),
    width: z.number(),
    height: z.number(),
    static: z.boolean()
})

export const UpdateElementSchema = z.object({
    imageUrl: z.string(),
})

export const CreateAvatarSchema = z.object({
    name: z.string(),
    imageUrl: z.string(),
})

export const CreateMapSchema = z.object({
    thumbnail: z.string(),
    dimensions: z.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
    name: z.string(),
    defaultElements: z.array(z.object({
        elementId: z.string(),
        x: z.number(),  
        y: z.number(),
    }))
})

declare global {
    namespace Express {
      export interface Request {
        role?: "Admin" | "User";
        userId?: string;
      }
    }
}