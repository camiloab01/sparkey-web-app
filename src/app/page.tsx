import Link from 'next/link'

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-7 sm:items-center">
        <ol className="list-inside list-decimal text-sm text-left sm:text-center font-[family-name:var(--font-geist-mono)]">
          <li>Scan the QR Code on the game console 🕹️</li>
          <li>Place your stakes 💰</li>
          <li>Start match and dodge the tab! 😎</li>
        </ol>
        <div className="flex gap-2 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/joinGame"
          >
            👉🏻 Join a game
          </Link>
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/newGame"
          >
            👉🏻 Start a new game
          </Link>
        </div>
      </main>
    </div>
  )
}
