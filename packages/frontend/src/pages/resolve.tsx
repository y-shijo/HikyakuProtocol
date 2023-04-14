import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import CopyToClipboard from '@components/common/CopyToClipboard'
import LoadingInfo from '@components/common/LoadingInfo'
import { HomeTopBar } from '@components/home/HomeTopBar'
import { CenterBody } from '@components/layout/CenterBody'
import { HikyakuProtocol__factory } from '@ethathon/contracts/typechain-types'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useDeployments } from '@shared/useDeployments'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import 'twin.macro'
import { useSigner } from 'wagmi'

const ResolvePage: NextPage = () => {
  const router = useRouter()
  const { data: signer } = useSigner()
  const { contracts } = useDeployments()

  const [isResolving, setIsResolving] = useState(true)
  const [resolvedAddress, setResolvedAddress] = useState<string | null>(null)

  const { k } = router.query
  const id = 'ken@example.com'

  useEffect(() => {
    ;(async () => {
      if (!signer || !contracts) return
      const deployedAddress = contracts.HikyakuProtocol.address
      const contract = HikyakuProtocol__factory.connect(deployedAddress, signer)
      try {
        const owner = await contract.getResolvedAddress(id)
        setResolvedAddress(owner ?? null)
      } catch (e) {
        console.error(e)
      }
      setResolvedAddress(null)
      setIsResolving(false)
    })()
  }, [signer, contracts])

  return (
    <>
      <HomeTopBar />

      <CenterBody tw="mt-20 mb-10 px-5">
        <Heading as="h1" size="xl">
          {id}
        </Heading>
        <div tw="my-4" />
        {isResolving ? (
          <LoadingInfo></LoadingInfo>
        ) : resolvedAddress ? (
          <Box textAlign="center">
            <Text>is resolved with</Text>
            <div tw="my-1" />
            <Text fontSize="4xl">🤝</Text>
            <div tw="my-1" />
            <CopyToClipboard text={resolvedAddress}></CopyToClipboard>
          </Box>
        ) : (
          <Text>This is not connected any web3 address yet.</Text>
        )}

        <Divider tw="m-10" maxWidth={16} />
        <Tabs variant="soft-rounded" align="center">
          <Card size="md">
            <CardHeader>
              <TabList>
                <Tab>Select from your wallet</Tab>
                <Tab>Create wallet</Tab>
              </TabList>
            </CardHeader>

            <CardBody>
              <TabPanels>
                <TabPanel>
                  <CenterBody tw="m-4">
                    <ConnectButton />
                    <div tw="my-4" />
                    <Button colorScheme="blue" size="md">
                      Connect your web3 address to {id}
                    </Button>
                  </CenterBody>
                </TabPanel>
                <TabPanel>
                  <CenterBody tw="m-4">
                    <p>🚧</p>
                  </CenterBody>
                </TabPanel>
              </TabPanels>
            </CardBody>
          </Card>
        </Tabs>
      </CenterBody>
    </>
  )
}

export default ResolvePage
