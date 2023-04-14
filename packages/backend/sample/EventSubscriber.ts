import { ethers } from 'ethers'

require('dotenv').config()

const GREETING_ABI = require('./abi/Greeting.json')

type TnamedAddress = {
    address: string
    ensName?: string
}

async function main() {
    let provider
    let greetingContractAddress

    const mode: string = process.env.MODE as string
    // 環境に応じた設定
    if (mode == 'local') {
        provider = new ethers.providers.JsonRpcProvider(process.env.LOCAL_RPC_ENDPOINT)
        greetingContractAddress = process.env.LOCAL_GREETING_CONTRACT as string
    } else if (mode == 'test') {
        provider = new ethers.providers.InfuraProvider(
            process.env.TESTNET_NETWORK_NAME,
            process.env.INFURA_API_KEY,
        )
        // TODO: Contract Address should be fetched via ENS (facade.thegreeting.eth)
        greetingContractAddress = process.env.TESTNET_GREETING_CONTRACT as string
    } else {
        throw new Error('Unknown Mode')
    }

    // コントラクトのインスタンス化
    const greetingContract = new ethers.Contract(greetingContractAddress, GREETING_ABI, provider)
    console.log(`Contract created:: [address] ${greetingContract.address}`)

    const campaignList = await greetingContract.getCampaignList()
    console.log(`[campaign list] ${campaignList}`)

    // Listen対象のイベント
    const eventQuery = greetingContract.filters.SendMessage()
    // const events = await greetingContract.queryFilter(eventQuery);
    // const eventArgs = events[0].args;
    // console.log(eventArgs?.from)
    // console.log(eventArgs?.to)
    // console.log(eventArgs?.campaign)

    // Listen Event...
    // TODO: When fetched via ENS and address is updated, unsubscribe current subscrption, and subscribe to new contract.
    greetingContract.on(eventQuery, (from, to, campaign, event) => {
        console.log(`[New log found] from ${from} to ${to} via ${campaign}`)

        const fromNamedAddress: TnamedAddress = { address: from }
        const toNamedAddress: TnamedAddress = { address: to }
        const campaignNamedAddress: TnamedAddress = { address: campaign }
        const txHash = event.transactionHash
    })
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
