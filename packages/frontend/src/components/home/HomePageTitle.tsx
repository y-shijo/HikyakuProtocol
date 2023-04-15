import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import 'twin.macro'

export const HomePageTitle: FC = () => {
  const title = 'Email 🤝 web3 address'
  const desc = 'Resolve any email address to web3 address'
  const githubHref = 'https://github.com/y-shijo/HikyakuProtocol'

  return (
    <>
      <div tw="flex flex-col items-center text-center font-mono">
        <Link
          href={githubHref}
          target="_blank"
          className="group"
          tw="flex cursor-pointer flex-col items-center"
        >
          <h1 tw="mt-4 font-black text-3xl tracking-tight underline-offset-4 group-hover:underline">
            {title}
          </h1>
        </Link>
        <p tw="mt-1 text-gray-400">{desc}</p>
      </div>
    </>
  )
}
