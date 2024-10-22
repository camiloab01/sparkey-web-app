import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 sm:items-start">
        <h1 className="text-4xl text-center">New Game 🎲</h1>
        <div className="flex flex-col gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger>Stake of the round</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Beer 🍺</DropdownMenuItem>
              <DropdownMenuItem>Malort shot 🥃</DropdownMenuItem>
              <DropdownMenuItem>Rum 🍹</DropdownMenuItem>
              <DropdownMenuItem>Virgin Piña Colada 🍍</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Input placeholder="Your name" />
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            👉🏻 Create game
          </a>
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
