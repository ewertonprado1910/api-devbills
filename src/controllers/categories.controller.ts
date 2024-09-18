import { NextFunction, Request, Response } from "express"

import { CategoriesServices } from "../services/categories-service"
import { CreateCatogoryDTO } from "../dtos/categories.dtos"
import { StatusCodes } from "http-status-codes"
import { BodyRequest } from "./types"

export class CategoriesController {
    constructor(private serviceTheCategories: CategoriesServices) { }

    create = async (
        req: BodyRequest<CreateCatogoryDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { title, color } = req.body

            const result = await this.serviceTheCategories.create({ title, color })

            return res.status(StatusCodes.CREATED).json(result)
        } catch (err) {
            next(err)
        }
    }


    index = async (_: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.serviceTheCategories.index()

            return res.status(StatusCodes.OK).json(result)
        } catch (err) {
            next(err)
        }
    }
}

