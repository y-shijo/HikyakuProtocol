import { HomePageInput } from '@components/home/HomePageInput'
import { HomePageTitle } from '@components/home/HomePageTitle'
import { HomeTopBar } from '@components/home/HomeTopBar'
import { CenterBody } from '@components/layout/CenterBody'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import 'twin.macro'

const HomePage: NextPage = () => {
  return (
    <>
      {/* Top Bar */}
      <HomeTopBar />

      <CenterBody tw="mt-20 mb-10 px-5">
        {/* Rainbowkit Connect Button */}
        <ConnectButton />
        <div tw="my-8" />
        {/* Title */}
        <HomePageTitle />
        <HomePageInput />

        <div tw="my-14 w-14 bg-gray-800 h-[2px]" />
      </CenterBody>
    </>
  )
}

export default HomePage
