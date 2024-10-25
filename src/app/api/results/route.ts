import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../../firebase/config'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    if (request.body) {
      const resultsData = await request.json()

      const resultsRef = await addDoc(collection(db, 'results'), {
        gameCode: resultsData.gameCde,
        player1Misses: resultsData.player1Misses,
        player2Misses: resultsData.player2Misses,
        player3Misses: resultsData.player3Misses,
        player4Misses: resultsData.player4Misses,
      })

      return NextResponse.json(resultsRef, { status: 200 })
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
