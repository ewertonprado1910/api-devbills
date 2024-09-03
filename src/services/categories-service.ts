import { CategoriesRepository } from "../database/repositories/categories.repository";
import { CreateCatogoryDTO } from "../dtos/categories.dtos";
import { Category } from "../entities/category.entity";


export class CategoriesServices {
    constructor(private categoriesRepository: CategoriesRepository) { }

    async create({title, color }: CreateCatogoryDTO): Promise<Category> {
        const category = new Category({
            title,
            color
        })

        const createCategory = await this.categoriesRepository.create(category)

        return createCategory

    }
}