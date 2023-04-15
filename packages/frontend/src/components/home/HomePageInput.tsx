import { Input } from '@chakra-ui/react'
import { FC } from 'react'
import 'twin.macro'

export const HomePageInput: FC = () => {
  return (
    <>
      <form
        action="/resolve"
        method="get"
        tw="mt-8 flex flex-col items-center text-center font-mono"
      >
        <Input id="id" name="id" placeholder="Enter email to resolve" size="lg" tw="h-16 w-96" />
      </form>
    </>
  )
}
