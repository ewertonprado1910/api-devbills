import { CategoriesRepository } from "../database/repositories/categories.repository";
import { CategoryModel } from "../database/schemas/category.schema";
import { CategoriesServices } from "../services/categories-service";

export class CategoriesFactory {
    private static serviceTheCategories: CategoriesServices

    static getServiceInstance() {
        if(this.serviceTheCategories) {
            return this.serviceTheCategories
        }
        const repository = new CategoriesRepository(CategoryModel)
        const service = new CategoriesServices(repository)

        this.serviceTheCategories = service 

        return service
    }

}