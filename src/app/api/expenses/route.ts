import { createExpenseSchema } from '@/types/schema'
import { NextResponse } from 'next/server'
import { db } from '@/utils/db'
import { auth } from '../auth/options'

export async function POST (req: Request) {
  try {
    const body = await req.json()
    const { spent, spentName, typeOfExpense } = createExpenseSchema.parse(body)
    const loggedUserSession = await auth()
    const uniqueUser = await db.user.findUnique({ where: { email: String(loggedUserSession?.user.email) } })

    const newExpense = await db.expenses.create({
      data: {
        spent,
        spentName,
        authorID: Number(uniqueUser?.id),
        typeOfExpense
      }
    })

    return NextResponse.json(newExpense)
  } catch (error) {
    console.log(error)
  }
}

export async function GET () {
  try {
    const loggedUserSession = await auth()

    if (loggedUserSession == null) return NextResponse.json({ messae: "You're not allowed! Login first" })

    const uniqueUser = await db.user.findUnique({ where: { email: String(loggedUserSession?.user.email) } })
    const userExpenses = await db.expenses.findMany({ where: { authorID: uniqueUser?.id } })

    return NextResponse.json(userExpenses)
  } catch (error) {
    console.log(error)
  }
}

export async function DELETE (req: Request) {
  const loggedUserSession = await auth()
  const body = await req.json()

  if (loggedUserSession == null) return NextResponse.json({ messae: "You're not allowed! Login first" })

  await db.expenses.delete({ where: { id: body.expenseID } })

  return NextResponse.json({ message: 'Expense deleted successfully' })
}
