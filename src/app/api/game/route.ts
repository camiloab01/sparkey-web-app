import {
  collection,
  addDoc,
  getCountFromServer,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
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

export async function GET() {
  try {
    const coll = collection(db, 'games')
    const snapshot = await getCountFromServer(coll)
    const latestGameId = `TD${snapshot.data().count}`

    const q1 = query(
      collection(db, 'games'),
      where('gameId', '==', latestGameId)
    )

    const querySnapshotGames = await getDocs(q1)
    const gameDoc = querySnapshotGames.docs[0]

    const q2 = query(
      collection(db, 'players'),
      where('gameId', '==', latestGameId)
    )

    const querySnapshotPlayers = await getDocs(q2)
    const playersDocs = querySnapshotPlayers.docs

    const returnData = {
      gameReady: gameDoc.data().numberOfPlayers === playersDocs.length,
      gameCode: latestGameId,
      player1:
        playersDocs.filter(
          (playerDoc) => playerDoc.data().position === 'player1'
        ).length > 0,
      player2:
        playersDocs.filter(
          (playerDoc) => playerDoc.data().position === 'player2'
        ).length > 0,
      player3:
        playersDocs.filter(
          (playerDoc) => playerDoc.data().position === 'player3'
        ).length > 0,
      player4:
        playersDocs.filter(
          (playerDoc) => playerDoc.data().position === 'player4'
        ).length > 0,
    }

    return NextResponse.json(returnData, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: `Internal server error: ${error}` },
      { status: 500 }
    )
  }
}
