import { StatusCodes } from "http-status-codes";

import { CategoriesRepository } from "../database/repositories/categories.repository";
import { TransactionsRepository } from "../database/repositories/transactions.repository";
import { CreateTransactionDTO, GetDashboardDTO, GetFinancialEvolutionDTO, IndexTransactionsDTO } from "../dtos/transactions.dtos";
import { Transaction } from "../entities/transactions.entity";
import { AppError } from "../errors/app.error";
import { Balance } from "../entities/balance.entity";
import { Expense } from "../entities/expense.entity";

export class TransactionsService {
    constructor(
        private transactionsRepository: TransactionsRepository,
        private categoriesRepository: CategoriesRepository

    ) { }

    async create({ title, type, date, categoryId, amount }:
        CreateTransactionDTO): Promise<Transaction> {

        const category = await this.categoriesRepository.findById(categoryId)

        if (!category) {
            throw new AppError("❌ This category does not exist", StatusCodes.NOT_FOUND)
        }

        const transaction = new Transaction({
            title, type, date, category, amount
        })

        const createTransaction = await this.transactionsRepository.create(transaction)

        return createTransaction
    }

    async index(filters: IndexTransactionsDTO): Promise<Transaction[]> {
        const transaction = await this.transactionsRepository.index(filters)

        return transaction
    }

    async getDashboard({ beginDate, endDate }: GetDashboardDTO):
        Promise<{ balance: Balance, expenses: Expense[] }> {
        let [balance, expenses] = await Promise.all([
            this.transactionsRepository.getBalance({
                beginDate,
                endDate
            }),
            this.transactionsRepository.getExpenses({
                beginDate,
                endDate
            })
        ])

        if (!balance) {
            balance = new Balance({
                _id: null,
                incomes: 0,
                expenses: 0,
                balance: 0
            })
        }
        return { balance, expenses }
    }

    async getFinancialEvolution({ year }: GetFinancialEvolutionDTO): Promise<Balance[]> {
        const resultFinacialEvolution = await this.transactionsRepository.getFinancialEvolution({ year })

        return resultFinacialEvolution

    }

}


