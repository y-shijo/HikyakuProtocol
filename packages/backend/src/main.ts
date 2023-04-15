import console from 'console'
import * as EmailValidator from 'email-validator'
import { ethers } from 'ethers'
import HIKYAKU_ABI from './abi/HikyakuProtocol.json'
import { sendMail } from './emailJs'
import { createJwt } from './jwt'
import { getAddressFromPkp, mintPkP } from './litProtocol'

require('dotenv').config()

function getProvider() {
    console.log(`getProvider() Called`)

    const environment = process.env.BLOCKCHAIN_NETWORK
    let provider: ethers.providers.JsonRpcProvider
    switch (environment) {
        case 'mumbai':
            console.log(`Current Network... Mumbai`)
            provider = new ethers.providers.JsonRpcProvider(process.env.MUMBAI_RPC_ENDPOINT)
            break
        default:
            console.log(`Current Network... Local`)
            provider = new ethers.providers.JsonRpcProvider(process.env.LOCAL_RPC_ENDPOINT)
            break
    }

    console.log(`getProvider() Finished`)
    return provider
}

function getSigner(provider: ethers.providers.JsonRpcProvider) {
    console.log(`getSigner() Called`)

    const environment = process.env.BLOCKCHAIN_NETWORK
    let privateKey: string
    switch (environment) {
        case 'mumbai':
            console.log(`Current Network... Mumbai`)
            privateKey = process.env.DEPLOYER_PK_PROD as string
            break
        default:
            console.log(`Current Network... Local`)
            privateKey = process.env.DEPLOYER_PK_LOCAL as string
            break
    }
    const signer = new ethers.Wallet(privateKey, provider)
    return signer
}

function instantiateHikyakuContract(provider: ethers.providers.JsonRpcProvider) {
    console.log(`instantiateHikyakuContract() Called`)

    const environment = process.env.BLOCKCHAIN_NETWORK
    let contractAddress: string
    switch (environment) {
        case 'mumbai':
            console.log(`Current Network... Mumbai`)
            contractAddress = process.env.MUMBAI_HIKYAKU_CONTRACT_ADDR as string
            break
        default:
            console.log(`Current Network... Local`)
            contractAddress = process.env.LOCAL_HIKYAKU_CONTRACT_ADDR as string
            break
    }

    const contract = new ethers.Contract(contractAddress, HIKYAKU_ABI, provider)

    console.log(`instantiateHikyakuContract() finished with Contract Address ${contractAddress}`)
    return contract
}

async function main() {
    console.log('Main: Started')

    // Initialize Provider
    const provider = getProvider()

    // Get Signer
    const signer = getSigner(provider)

    // Instatiate Contract
    const hikyakuContract = instantiateHikyakuContract(provider)

    // Event to be subscrived
    const eventQuery = hikyakuContract.filters.ResolveRequested()

    //
    const testEventQuery = await hikyakuContract.queryFilter(eventQuery)
    console.log(eventQuery)
    console.log(testEventQuery)

    // Start Event Subscription
    hikyakuContract.on(eventQuery, async (requester, mailAddress, name, message) => {
        console.log(
            `Request from ${requester} (name: ${name}) to ${mailAddress} with message ${message}`,
        )

        // Email Validation
        if (!EmailValidator.validate(mailAddress)) {
            console.log(
                `Given email address "${mailAddress}" is invalid. Skip the email sending...`,
            )
            return
        }

        // mint PKP and get walletAddress
        const pkpTokenId = await mintPkP()
        const tempWalletAddress = await getAddressFromPkp(pkpTokenId)

        // Register pkpAddress
        console.log(`Registering pkpAddress...`)
        hikyakuContract
            .connect(signer)
            .registerPkpAddress(requester, mailAddress, tempWalletAddress)
        console.log(`pkpAddress Registered!`)

        // create JWT
        const signedJwt = createJwt(mailAddress)

        // send Email
        const link = `https://hikyaku-protocol.vercel.app/resolve?k=${signedJwt}`
        sendMail(mailAddress, requester, link, name, message)

        console.log(`Event Processing Fisnihed`)
    })

    console.log(`Event Subscribing...`)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
