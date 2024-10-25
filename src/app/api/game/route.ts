import { collection, addDoc, getCountFromServer } from 'firebase/firestore'
import { db } from '../../../firebase/config'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    if (request.body) {
      const gameData = await request.json()

      const coll = collection(db, 'games')
      const snapshot = await getCountFromServer(coll)
      const gameId = `TD${snapshot.data().count + 1}`

      await addDoc(collection(db, 'games'), {
        stake: gameData.stake,
        numberOfPlayers: gameData.numberOfPlayers,
        dateTime: Date.now(),
        isActive: true,
        gameId: gameId,
      })

      return NextResponse.json(gameId, { status: 200 })
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
