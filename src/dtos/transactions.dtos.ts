import { z } from "zod";


export const createTransationsSchema = {
    title: z.string(),
    amount: z.number().int().positive(),
    type: z.string(),
    data: z.coerce.date(),
    categoryId: z.string()



}