import * as EmailValidator from 'email-validator'
import { ethers } from 'ethers'
import HIKYAKU_ABI from './abi/HikyakuProtocol.json'
import { sendMail } from './emailJs'
import { createJwt } from './jwt'

require('dotenv').config()

async function main() {
    console.log('Main: Started')

    // Initialize Provider
    const provider = new ethers.providers.JsonRpcProvider(process.env.LOCAL_RPC_ENDPOINT)

    // Instatiate Contract
    const contract = new ethers.Contract(
        process.env.HIKYAKU_CONTRACT_ADDR as string,
        HIKYAKU_ABI,
        provider,
    )

    await contract.getResolvedAddress('yoshinobu@startale.org')

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
