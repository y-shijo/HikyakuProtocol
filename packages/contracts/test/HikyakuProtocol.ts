import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('HikyakuProtocol', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners()

    const HikyakuProtocol = await ethers.getContractFactory('HikyakuProtocol')
    const hikyakuProtocol = await HikyakuProtocol.deploy()

    return { hikyakuProtocol, owner, otherAccount }
  }

  describe('Deployment Check', function () {
    it('Should contract deployed successfully', async function () {
      const { hikyakuProtocol, owner } = await loadFixture(deployFixture)

      expect(hikyakuProtocol.address).to.be.not.null
    })
  })

  describe('Request Resolve', function () {
    it('When no resolved data, emit an event', async function () {
      const { hikyakuProtocol, owner } = await loadFixture(deployFixture)

      const mailAddress = 'test@example.com'
      await expect(hikyakuProtocol.connect(owner).requestResolve(mailAddress))
        .to.emit(hikyakuProtocol, 'ResolveRequested')
        .withArgs(owner.address, mailAddress)
    })
  })

  it('Should return nothing when the Resolved Address is available', async function () {
    const { hikyakuProtocol, owner } = await loadFixture(deployFixture)
    const mailAddress = 'test@example.com'
  })
})
