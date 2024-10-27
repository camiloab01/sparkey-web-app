import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2">
        <h1 className="text-4xl text-center">Join Game 🎲🕺🏻👯‍♀️👽</h1>
        <Input placeholder="Game code" />
        <div className="flex flex-col items-center gap-2">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/"
          >
            👉🏻 Join a game
          </Link>
          <p>Or</p>
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/newGame"
          >
            👉🏻 Create game
          </Link>
        </div>
      </main>
    </div>
  )
}
