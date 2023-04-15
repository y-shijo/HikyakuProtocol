import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Input,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react'
import { HikyakuProtocol__factory } from '@ethathon/contracts/typechain-types' // TODO
import { useDeployments } from '@shared/useDeployments'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import 'twin.macro'

import { useSigner } from 'wagmi'

interface NotificationProvider {
  label: string
  value: string
}

export const RequestResolveContractInteractions = ({ id }: { id: string }) => {
  const { data: signer } = useSigner()
  const { contracts } = useDeployments()
  const [isSending, setIsSending] = useState(false)
  const [hasSent, setHasSent] = useState(false)
  const [errorText, setErrorText] = useState<string | null>(null)

  // TODO(knaoe): retrieve from contract
  const notificationProviders: NotificationProvider[] = [
    {
      label: 'HikyakuNotificationProvider(First-party, Email turbo)',
      value: 'hikyaku-turbo-notification-provider',
    },
    {
      label: 'HikyakuNotificationProvider(First-party, Email normal)',
      value: 'hikyaku-notification-provider',
    },
  ]

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const formValue = Object.fromEntries(formData.entries())
    const { name, message } = formValue

    await handleRequestResolve(name.toString(), message.toString())
  }

  const handleRequestResolve = async (name?: string, message?: string) => {
    if (typeof id !== 'string' || !signer || !contracts) return
    console.log('handleRequestResolve', id, name, message)
    const deployedAddress = contracts.HikyakuProtocol.address
    const contract = HikyakuProtocol__factory.connect(deployedAddress, signer)
    try {
      setIsSending(true)
      setErrorText(null)
      const tx = await contract.requestResolve(id, name!, message!) // id, name, message
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
            <form onSubmit={onSubmit}>
              <Stack spacing={4}>
                <Stack tw="mb-8" direction="row" spacing={4}>
                  <Text>Notification provider</Text>
                  <Select disabled>
                    {notificationProviders.map((provider) => (
                      <option key={provider.value} value={provider.value}>
                        {provider.label}
                      </option>
                    ))}
                  </Select>
                </Stack>
                <Input id="name" name="name" type="text" size="lg" placeholder="Your name" />
                <Input
                  id="message"
                  name="message"
                  type="text"
                  size="lg"
                  placeholder="Your message"
                  maxLength={100}
                />
                <Button isLoading={isSending} type="submit" colorScheme="blue" size="lg">
                  Send email to resolve
                </Button>
                {errorText && (
                  <Alert status="error" tw="mt-4" maxWidth="lg">
                    <AlertIcon />
                    <AlertDescription noOfLines={10}>{errorText}</AlertDescription>
                  </Alert>
                )}
              </Stack>
            </form>
          </Box>
        )}
      </Box>
    </>
  )
}
