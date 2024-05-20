import { NextResponse } from 'next/server'
import { hash } from 'bcrypt'
import { formRegisterSchema } from '@/types/schema'
import { db } from '@/utils/db'

export async function POST (req: Request) {
  try {
    const body = await req.json()
    const { email, username, password } = formRegisterSchema.parse(body)

    const existingUserByEmail = await db.user.findUnique({ where: { email } })

    if (existingUserByEmail != null) {
      return NextResponse.json({ user: null, message: "User's email is already in use" }, { status: 401 })
    }

    const existingUserByUsername = await db.user.findUnique({ where: { username } })

    if (existingUserByUsername != null) {
      return NextResponse.json({ user: null, message: 'Username is already in use' }, { status: 401 })
    }

    const hashedPassword = await hash(password, 10)
    await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    })

    return NextResponse.json({
      message: 'User created successfully!'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 })
  }
}
