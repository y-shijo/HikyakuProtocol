import {
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
import { HomeTopBar } from '@components/home/HomeTopBar'
import { CenterBody } from '@components/layout/CenterBody'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import 'twin.macro'

const ResolvePage: NextPage = () => {
  const router = useRouter()
  const { k } = router.query
  const id = 'ken@example.com'
  return (
    <>
      <HomeTopBar />

      <CenterBody tw="mt-20 mb-10 px-5">
        <Heading as="h1" size="xl">
          {id}
        </Heading>
        <div tw="my-4" />
        <Text>This is not connected any web3 address yet.</Text>
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
