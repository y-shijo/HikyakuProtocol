import { Box, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import { FC } from 'react'
import { HiOutlineExternalLink } from 'react-icons/hi'
import 'twin.macro'

export const HomeTopBar: FC = () => {
  const desc = 'Build in ETHTokyo 2023'
  const href = 'https://github.com/y-shijo/HikyakuProtocol'
  const topHref = '/'

  return (
    <>
      <Box>
        <Link
          href={href}
          tw="absolute top-0 left-0 right-0 z-10 flex items-center justify-center whitespace-pre-wrap bg-gray-900 py-2 px-2 text-center font-semibold text-sm text-white/75 hover:text-white"
        >
          <div tw="hidden sm:inline">{desc}</div>
          <HiOutlineExternalLink tw="ml-1.5" />
        </Link>
        <Link href={topHref} tw="flex items-center justify-center">
          <Heading as="h1" size="lg" tw="mt-12 max-w-md cursor-pointer">
            HikyakuProtocol
          </Heading>
        </Link>
      </Box>
    </>
  )
}
