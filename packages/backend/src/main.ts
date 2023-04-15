import console from 'console'
import * as EmailValidator from 'email-validator'
import { ethers } from 'ethers'
import HIKYAKU_ABI from './abi/HikyakuProtocol.json'
import { sendMail } from './emailJs'
import { createJwt } from './jwt'

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

    // Instatiate Contract
    const contract = instantiateHikyakuContract(provider)

    // Event to be subscrived
    const eventQuery = contract.filters.ResolveRequested()

    // Start Event Subscription
    contract.on(eventQuery, (requester, mailAddress) => {
        console.log(`Request from ${requester} to ${mailAddress}`)

        // Email Validation
        if (!EmailValidator.validate(mailAddress)) {
            console.log(
                `Given email address "${mailAddress}" is invalid. Skip the email sending...`,
            )
            return
        }

        // create JWT
        const signedJwt = createJwt(mailAddress)

        // send Email
        const link = `https://hikyaku-protocol.vercel.app/resolve?k=${signedJwt}`
        sendMail(mailAddress, requester, link)

        console.log(`Event Processing Fisnihed`)
    })
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
