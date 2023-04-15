import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Text } from '@chakra-ui/react'
import { HikyakuProtocol__factory } from '@ethathon/contracts/typechain-types' // TODO
import { useDeployments } from '@shared/useDeployments'
import { useState } from 'react'
import toast from 'react-hot-toast'
import 'twin.macro'

import { useSigner } from 'wagmi'

export const RequestResolveContractInteractions = ({ id }: { id: string }) => {
  const { data: signer } = useSigner()
  const { contracts } = useDeployments()
  const [isSending, setIsSending] = useState(false)
  const [hasSent, setHasSent] = useState(false)
  const [errorText, setErrorText] = useState<string | null>(null)

  const handleRequestResolve = async () => {
    if (typeof id !== 'string' || !signer || !contracts) return
    const deployedAddress = contracts.HikyakuProtocol.address
    const contract = HikyakuProtocol__factory.connect(deployedAddress, signer)
    try {
      setIsSending(true)
      setErrorText(null)
      const tx = await contract.requestResolve(id)
      console.log('requestResolve tx', tx)
      toast.success('Email sent! Wait for the owner to respond.')
      setIsSending(false)
      setHasSent(true)
    } catch (e) {
      console.error(e)
      setErrorText(String(e))
      setIsSending(false)
    }
  }

  if (!signer) return null

  return (
    <>
      <Box tw="my-2" textAlign="center">
        {hasSent ? (
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Email sent!
            </AlertTitle>
            <AlertDescription maxWidth="lg">Please wait for the owner to respond.</AlertDescription>
          </Alert>
        ) : (
          <Box>
            <Text>Ask the owner of email address for the web3 address.</Text>
            <div tw="my-8" />
            <Button
              isLoading={isSending}
              onClick={handleRequestResolve}
              colorScheme="blue"
              size="lg"
            >
              Send email to resolve
            </Button>
            {errorText && (
              <Alert status="error" tw="mt-4" maxWidth="lg">
                <AlertIcon />
                <AlertDescription noOfLines={10}>{errorText}</AlertDescription>
              </Alert>
            )}
          </Box>
        )}
      </Box>
    </>
  )
}
