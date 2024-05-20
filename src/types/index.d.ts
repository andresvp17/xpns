type Spent = number
type SpentName = string
type ID = number
type CreationDate = string
type UpdatedDate = string
type CreationTime = string

interface Expense {
    authorID: ID
    creationDate: CreationDate
    creationTime: CreationTime
    id: ID
    spent: Spent
    spentName: SpentName 
    updatedAt: UpdatedDate
    typeOfExpense: TypeOfExpense
}

export interface ExpensesTable {
    data: Expense[]
}

export enum Filters {
    Date = "Date",
    Spent = "Spent",
}

export enum TypeOfExpense {
    Deposit = "Deposit",
    Withdraw = "Withdraw"
}