// const { ethers } = require("hardhat");
// const hre = require("hardhat");

// const GREETING_CONTRACT_ADDRESS = "0x3Aa5ebB10DC797CAC828524e59A333d0A371443c"
// const CAMPAIGN_01_ADDRESS = "0x68B1D87F95878fE05B998F19b66F4baba5De1aed"
// const CAMPAIGN_02_ADDRESS = "0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE"

// async function main() {
//     // Addresses
//     const [owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();

//     // Get Contract Factories and instantiate the contract
//     const GreetingFactory = await hre.ethers.getContractFactory("TheGreeting");
//     const greetingContract = GreetingFactory.attach(GREETING_CONTRACT_ADDRESS)
//     console.log(`Contract: ${greetingContract.address}`)

//     // Send Messages (Need at least 0.05 ETH in the sender's wallet)
//     const from = addr2;
//     const fromAddress = from.address;
//     const toAddress = addr1.address;
//     const campaign = CAMPAIGN_01_ADDRESS;
//     console.log(`Send From ${fromAddress} to ${toAddress} via Campaign ${campaign}`)

//     const options = {value: ethers.utils.parseEther("0.05")};
//     await greetingContract.connect(from).send(campaign, toAddress, "https://example.com/", options)
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//     console.error(error);
//     process.exitCode = 1;
// });
