import {z} from 'zod'

export const signUpSchema = z.object({
    username: z.string(),
    password: z.string(),
    type: z.enum(["user","admin"])
}) 