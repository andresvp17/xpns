import { number, string, z } from 'zod'

const typeOfExpense = ["Deposit", "Withdraw"] as const

export const formRegisterSchema = z.object({
    username: z.string()
      .min(6, { message: "Username must have at least 6 characters long" })
      .max(30, { message: "Username must have less than 30 characters" }),
    email: z.string()
      .email(),
    password: z.string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
})

export const formLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
})

export const updateProfileSchema = z.object({
  file: z.any(),
  username: z.string()
  .min(6, { message: "Username must have at least 6 characters long" })
  .max(30, { message: "Username must have less than 30 characters" }),
})

export const createExpenseSchema = z.object({
    spentName: string()
      .min(5, { message: "Spent Name should be between 5 or 70 characters" })
      .max(70, { message: "Spent Name should be between 5 or 70 characters" }),
    spent: number()
      .positive("The inputed number must be positive")
      .gt(0, { message: "The spent money must be greater than 0" }),
    typeOfExpense: z.enum(typeOfExpense)
})