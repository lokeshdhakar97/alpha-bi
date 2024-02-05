import User from '@/modal/userSchema'
import { connectMongoDB } from '@/utils/db'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
// import sign from 'jsonwebtoken/sign'
import { sign } from 'jsonwebtoken'

export async function POST(req: Request) {
  try {
    await connectMongoDB()

    const { fullname, email, password } = await req.json()

    const exitUser = await User.findOne({ email })

    if (exitUser) {
      return NextResponse.json({ message: 'User already exist' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({ fullname, email, password: hashedPassword })

    const token = sign({ email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    })

    return NextResponse.json({ message: 'User created successfully', jsonToken: token, user })
  } catch (error: any) {
    console.log(error.message)
    return {
      status: 500,
      body: { error: error.message },
    }
  }
}