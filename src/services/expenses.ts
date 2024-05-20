interface Expense {
  authorID: number
  createdAt: string
  id: number
  spent: number
  spentName: string
  updatedAt: string
  typeOfExpense: string
}

export const getExpenses = async () => {
  return await fetch('/api/expenses')
    .then(async (res) => await res.json())
    .then((res) => {
      const mappedResponse = res.map((expense: Expense) => {
        const { authorID, createdAt, spent, spentName, updatedAt, id, typeOfExpense } = expense
        const [creationDate, createdTime] = createdAt.split('T')

        const formattedTime = createdTime.slice(0, 8)

        return {
          authorID,
          creationTime: formattedTime,
          creationDate,
          spent,
          spentName,
          updatedAt,
          id,
          typeOfExpense
        }
      })

      return mappedResponse
    })
}
