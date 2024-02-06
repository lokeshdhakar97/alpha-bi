import Gif from '@/modal/gifSchema'
import { connectMongoDB } from '@/utils/db'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  await connectMongoDB()

  try {
    const topLikedGifs = (await Gif.find().sort({ likeBy: 1 }).limit(5)).reverse()
    return Response.json(topLikedGifs)
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Internal Server Error' })
  }
}
