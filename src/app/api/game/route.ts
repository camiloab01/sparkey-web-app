import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../../firebase/config'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    if (request.body) {
      const gameData = await request.json()

      const gameRef = await addDoc(collection(db, 'games'), {
        stake: gameData.stake,
        creator: gameData.creator,
        isActive: true,
      })

      return NextResponse.json(gameRef, { status: 200 })
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
