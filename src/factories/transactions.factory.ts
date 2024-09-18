import { CategoriesRepository } from "../database/repositories/categories.repository"
import { TransactionsRepository } from "../database/repositories/transactions.repository"
import { CategoryModel } from "../database/schemas/category.schema"
import { TransactionsModel } from "../database/schemas/transactios.schema"
import { TransactionsService } from "../services/transactions-service"


export class TransactionsFactory {
    private static transactionService: TransactionsService

    static getServiceInstance() {
        if(this.transactionService) {
            return this.transactionService
        }
        const repository = new TransactionsRepository(TransactionsModel)
        const categoriesRepository = new CategoriesRepository(CategoryModel) 
        const service = new TransactionsService(repository, categoriesRepository)

        this.transactionService = service 

        return service
    }

}