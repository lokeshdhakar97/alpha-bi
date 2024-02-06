import { NextRequest, NextResponse } from 'next/server'

export default async function GET(req: NextRequest, res: NextResponse) {
  req.cookies.clear()
  return Response.json({ message: 'User logged out successfully' })
}
