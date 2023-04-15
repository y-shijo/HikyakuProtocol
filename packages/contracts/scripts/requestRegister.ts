import hre, { ethers } from 'hardhat'

const HIKYAKU_CONTRACT_ADDR = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
// const mailAddress = 'yoshinobushijo02264@gmail.com'
const mailAddress = 'zhhaozhi0717@gmail.com'

async function main() {
    // Addresses
    const [owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners()

    // Get Contract Factories and instantiate the contract
    const HikyakuFactory = await hre.ethers.getContractFactory('HikyakuProtocol')
    const hikyakuContract = HikyakuFactory.attach(HIKYAKU_CONTRACT_ADDR)
    console.log(`hikyakuContract at: ${hikyakuContract.address}`)

    // Send Resolve Requesst
    console.log(`Send resolve request from ${owner.address} to ${mailAddress}`)
    await hikyakuContract.connect(owner).requestResolve(mailAddress)
    console.log(`Request sent!`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
