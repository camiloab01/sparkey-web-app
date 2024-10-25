'use client'

import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { useSearchParams } from 'next/navigation'

export default function Home() {
  const { isConnected, address } = useAccount()
  const searchParams = useSearchParams()
  const [stake, setStake] = useState<undefined | string>()
  const [numberOfPlayers, setNumberOfPlayers] = useState<undefined | number>()
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [showNumberOfPlayersMsg, setShowNumberOfPlayersMsg] = useState(false)

  console.log(searchParams.get('player'))

  const handleCreateGame = async () => {
    if (!numberOfPlayers || !stake) {
      setShowErrorMessage(true)
    } else {
      setShowErrorMessage(false)
      try {
        const createGameResp = await fetch('api/game', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            stake: stake,
            numberOfPlayers: numberOfPlayers,
          }),
        })
        const gameCode = await createGameResp.json()
        console.log(gameCode)

        await fetch('api/player', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address: address,
            position:
              searchParams.get('player') !== null
                ? `player${searchParams.get('player')}`
                : 'player1',
            gameCode: gameCode,
          }),
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleGet = async () => {
    try {
      const resp = await fetch('api/game', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const message = await resp.json()
      console.log(message)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (
      (numberOfPlayers && numberOfPlayers < 2) ||
      (numberOfPlayers && numberOfPlayers > 4)
    ) {
      setShowNumberOfPlayersMsg(true)
    } else {
      setShowNumberOfPlayersMsg(false)
    }
  }, [numberOfPlayers])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2">
        <h1 className="text-4xl text-center">New Game 🎲</h1>
        <div className="flex flex-col gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              {stake ?? 'Stake of the round'}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStake('Beer')}>
                Beer 🍺
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStake('Coke')}>
                Coke 🥤
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStake('MalortShot')}>
                Malort shot 🥃
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStake('Handshake')}>
                Handshake 🍺🥃
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStake('WhiskeyShot')}>
                WhiskeyShot 🥃
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Input
            placeholder="Number of players"
            onChange={(e) => setNumberOfPlayers(Number(e.target.value))}
            type="number"
            min={2}
          />
        </div>
        {showErrorMessage && (
          <p className="text-center text-red-500">
            Please select the stake for the game and the number of players.
          </p>
        )}
        {showNumberOfPlayersMsg && (
          <p className="text-center text-red-500">
            The number of players needs to be between 2 and 4.
          </p>
        )}
        {!isConnected && (
          <p className="text-center text-red-500">Please connect your wallet</p>
        )}
        <div className="flex flex-col items-center gap-2">
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={handleCreateGame}
            disabled={!isConnected || !stake || !numberOfPlayers}
          >
            👉🏻 Create game
          </button>
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={handleGet}
          >
            👉🏻 Test
          </button>
          <p>Or</p>
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/joinGame"
          >
            👉🏻 Join a game
          </Link>
        </div>
      </main>
    </div>
  )
}
