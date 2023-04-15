import {
  Alert,
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
import { RequestResolveContractInteractions } from '@components/web3/RequestResolveContractInteractions'
import { HikyakuProtocol__factory } from '@ethathon/contracts/typechain-types'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useDeployments } from '@shared/useDeployments'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import 'twin.macro'
import { useSigner } from 'wagmi'

const ResolvePage = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const router = useRouter()
  const { data: signer } = useSigner()
  const { contracts } = useDeployments()

  const [isResolving, setIsResolving] = useState(true)
  const [resolvedAddress, setResolvedAddress] = useState<string | null>(null)

  const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id
  const k = Array.isArray(router.query.k) ? router.query.k[0] : router.query.k

  useEffect(() => {
    ;(async () => {
      if (!id || !signer || !contracts) return
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

  if (!id)
    return (
      <>
        <CenterBody>
          <Alert>id query param is required.</Alert>
        </CenterBody>
      </>
    )

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
        {!isResolving &&
          (isAuthenticated ? (
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
          ) : (
            <RequestResolveContractInteractions id={id}></RequestResolveContractInteractions>
          ))}
      </CenterBody>
    </>
  )
}

export async function getServerSideProps() {
  // TODO(knaoe): check authentication with k
  return {
    props: {
      isAuthenticated: false,
    },
  }
}

export default ResolvePage
