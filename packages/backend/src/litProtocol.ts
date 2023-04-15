import { LitContracts } from '@lit-protocol/contracts-sdk'
import { ethers } from 'ethers'

async function getLitContract() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.CHRONICLE_RPC_ENDPOINT)
    const signer = new ethers.Wallet(process.env.DEPLOYER_PK_PROD as string, provider)

    const litContracts = new LitContracts({ signer })
    await litContracts.connect()

    return litContracts
}

async function mintPkP() {
    console.log(`mintPkp: Start`)

    const litContracts = await getLitContract()
    const mintCost = await litContracts.pkpNftContract.read.mintCost()
    console.log(`mintCost: ${mintCost}`)

    const tx = await litContracts.pkpNftContract.write.mintNext(2, { value: mintCost })

    const tokenId = (await tx.wait()).events[0].topics[3]

    console.log(`mintPkp: pkp was minted successfully with tokenID ${tokenId}`)
    return tokenId
}

async function getAddressFromPkp(tokenId: any) {
    console.log(`getAddressFromPkp: start for tokenId ${tokenId}`)

    const litContracts = await getLitContract()
    const address = await litContracts.pkpNftContract.read.getEthAddress(tokenId)

    console.log(`getAddressFromPkp: Finished - Address from PKP: ${address}`)
    return address
}

export { mintPkP, getAddressFromPkp }
