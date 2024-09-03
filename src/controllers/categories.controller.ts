import { Request, Response } from "express"

import { CategoriesServices } from "../services/categories-service"
import { CategoriesRepository } from "../database/repositories/categories.repository"
import { CategoryModel } from "../database/schemas/category.schema"
import { CreateCatogoryDTO } from "../dtos/categories.dtos"

export class CategoriesController {
    async create(
        req: Request<unknown, unknown, CreateCatogoryDTO>,
        res: Response) {

        const { title, color } = req.body
        const repository = new CategoriesRepository(CategoryModel)
        const service = new CategoriesServices(repository)

        const result = await service.create({ title, color })

        return res.status(201).json(result)

    }
}