import { Category } from "../entities/category.entity";


export class CategoriesServices {
    async create(): Promise<Category> {
        const category = new Category({
            title: "Exemple category",
            color: "#fff"
        })

        return category

    }
}