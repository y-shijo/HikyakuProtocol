import { Input } from '@chakra-ui/react'
import { FC } from 'react'
import 'twin.macro'

export const HomePageInput: FC = () => {
  return (
    <>
      <div tw="mt-6 flex flex-col items-center text-center font-mono">
        <Input placeholder="Enter email to resolve" size="lg" />
      </div>
    </>
  )
}
