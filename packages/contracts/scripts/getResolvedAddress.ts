import hre from 'hardhat'

const HIKYAKU_CONTRACT_ADDR = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
const requester = '0xdD2FD4581271e230360230F9337D5c0430Bf44C0'
const mailAddress = 'yoshinobushijo02264@gmail.com'

async function main() {
    // Get Contract Factories and instantiate the contract
    const HikyakuFactory = await hre.ethers.getContractFactory('HikyakuProtocol')
    const hikyakuContract = HikyakuFactory.attach(HIKYAKU_CONTRACT_ADDR)
    console.log(`hikyakuContract at: ${hikyakuContract.address}`)

    // Send Resolve Requesst
    const result = await hikyakuContract.getResolvedAddress(requester, mailAddress)
    console.log(`result: ${result}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
