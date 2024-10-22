'use client'

import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [stake, setStake] = useState<undefined | string>()
  const [creatorName, setCreatorName] = useState<undefined | string>()
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const handleCreateGame = async () => {
    if (!creatorName || !stake) {
      setShowErrorMessage(true)
    } else {
      setShowErrorMessage(false)
      try {
        return await fetch('api/game', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stake: stake, creator: creatorName }),
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

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
              <DropdownMenuItem onClick={() => setStake('Beer 🍺')}>
                Beer 🍺
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStake('Malort shot 🥃')}>
                Malort shot 🥃
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStake('Rum 🍹')}>
                Rum 🍹
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setStake('Virgin Piña Colada 🍍')}
              >
                Virgin Piña Colada 🍍
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Input
            placeholder="Your name"
            onChange={(e) => setCreatorName(e.target.value)}
          />
        </div>
        {showErrorMessage && (
          <p className="text-center text-red-500">
            Please select a stake for the game and your name.
          </p>
        )}
        <div className="flex flex-col items-center gap-2">
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={handleCreateGame}
          >
            👉🏻 Create game
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
      <footer className="row-start-3 flex items-center justify-center">
        <p className="flex text-center">
          Develop by Sparkey Team for Cyberjam 2024
        </p>
      </footer>
    </div>
  )
}
