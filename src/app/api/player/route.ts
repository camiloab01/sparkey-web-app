import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../../firebase/config'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    if (request.body) {
      const playerData = await request.json()

      const playerRef = await addDoc(collection(db, 'players'), {
        address: playerData.address,
        gameCode: playerData.gameCode,
        position: playerData.position,
      })

      return NextResponse.json(playerRef, { status: 200 })
    } else {
      return NextResponse.json(
        { error: 'Bad request, game info not provided' },
        { status: 400 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: `Internal server error: ${error}` },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json('Hello')
}
