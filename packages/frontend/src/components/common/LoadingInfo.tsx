import { Box, CircularProgress, Text } from '@chakra-ui/react'
import 'twin.macro'

const LoadingInfo = ({ text }: { text?: string }) => {
  return (
    <Box textAlign="center">
      <CircularProgress isIndeterminate></CircularProgress>
      <div tw="my-2" />
      <Text>{text ?? 'Loading...'}</Text>
    </Box>
  )
}

export default LoadingInfo
