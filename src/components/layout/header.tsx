import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="flex flex-col justify-end py-5 px-2 gap-10">
      <div className="flex sm:justify-end justify-start">
        <w3m-button />
      </div>
      <div className="flex flex-col sm:items-center">
        <p className="font-bold text-4xl">WELCOME TO</p>
        <Link href={'/'}>
          <Image
            src="/tabDuelLogo.png"
            width={500}
            height={500}
            alt="tabDuel Logo"
          />
        </Link>
      </div>
    </header>
  )
}
