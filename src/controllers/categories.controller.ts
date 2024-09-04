import { NextFunction, Request, Response } from "express"

import { CategoriesServices } from "../services/categories-service"
import { CategoriesRepository } from "../database/repositories/categories.repository"
import { CategoryModel } from "../database/schemas/category.schema"
import { CreateCatogoryDTO } from "../dtos/categories.dtos"
import { z } from "zod"
import { StatusCodes } from "http-status-codes"

export class CategoriesController {
    async create(
        req: Request<unknown, unknown, CreateCatogoryDTO>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { title, color } = req.body

            const repository = new CategoriesRepository(CategoryModel)
            const service = new CategoriesServices(repository)

            const result = await service.create({ title, color })

            return res.status(StatusCodes.CREATED).json(result)
        } catch (err) {
            next(err)
        }
    }
}