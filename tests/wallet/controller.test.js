const chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const assert = chai.assert
const WalletController = require('../../src/features/wallet/controller')
const { Protocol } = require('../../src/services/blockchain/constants')
const { config, mnemonic } = require('./constants')

describe.only('Test Suite of the Wallet (Controller)', () => {
  describe('Random mnemonic', () => {
    it('generate wallet', async () => {
      const controller = new WalletController(config)
      const wallet = await controller.generateWallet({
        protocol: Protocol.STELLAR,
      })
      assert.strictEqual(wallet.protocol, Protocol.STELLAR)
    })
    it('generate wallet error with unsupported protocol', () => {
      const controller = new WalletController(config)
      assert.isRejected(
        controller.generateWallet({ protocol: 'TEST' }),
        Error,
        'Unsupported blockchain protocol'
      )
    })
  })
  describe('From private key', () => {
    it('stellar', async () => {
      const controller = new WalletController(config)
      const wallet = await controller.generateWalletFromPrivateKey({
        protocol: Protocol.STELLAR,
        privateKey: 'SA6EEJRPDG2KNYMYCUJEWPUVDA3PGPUNX6JKNN2CX2K5LH34BWPKODYM'
      })
      assert.strictEqual(wallet.publicKey, 'GAC2V7MGMTG57FZKJSXRSZ4EIDL2RBFIYVXZJMTJZ232XPZQUCTYUCWL')
    })
    it('ripple', async () => {
      const controller = new WalletController(config)
      const wallet = await controller.generateWalletFromPrivateKey({
        protocol: Protocol.RIPPLE,
        privateKey: 'spjjDoTPjCrdRvVBrTcVGo4ouYG9X'
      })
      assert.strictEqual(wallet.address, 'rGcqB7ciEfDQpz9znXZSYXgEozqB5Xxhm')
    })
    it('bitcoin', async () => {
      const controller = new WalletController(config)
      const wallet = await controller.generateWalletFromPrivateKey({
        protocol: Protocol.BITCOIN,
        privateKey: '351dafbabc1e7211e44c744cab1ea0ef6ee621be6f0be363c275ed1d8f3a7772'
      })
      assert.strictEqual(wallet.address, 'n1vrMMcNaAig5fgdfdtC5DUu2G4NRodHpi')
    })
    it('ethereum', async () => {
      const controller = new WalletController(config)
      const wallet = await controller.generateWalletFromPrivateKey({
        protocol: Protocol.ETHEREUM,
        privateKey: '62a0747f04d08305e00618e1f5f750a06d5c0c336d3cf6971ef82a6f25605df2'
      })
      assert.strictEqual(wallet.address, '0x250f7fc273c792d76327ef37b709a82484fe0168')
    })
    it('celo', async () => {
      const controller = new WalletController(config)
      const wallet = await controller.generateWalletFromPrivateKey({
        protocol: Protocol.CELO,
        privateKey: '0x121498c189793c9f7f2beae35d681a797eb22484760701e0de5d5c9904499618'
      })
      assert.strictEqual(wallet.address, '0x8c33db44a78629cf60c88383d436eec356884625')
    })
    it('hathor', async () => {
      const controller = new WalletController(config)
      const wallet = await controller.generateWalletFromPrivateKey({
        protocol: Protocol.HATHOR,
        privateKey: 'cbc23f4dc6d485807ff86e51b7b0c39de0028e3d5db0ef0feb264e6625832829'
      })
      assert.strictEqual(wallet.address, 'WXK74dFXd6Ctj6EUBH3ctpWwoVR2TnHCjV')
    })
  })

  describe('From same mnemonic', () => {
    it('generate ethereum wallet', async () => {
      const controller = new WalletController(config)
      const wallet = await controller.generateWallet({
        protocol: Protocol.ETHEREUM,
        mnemonic,
        derivation: { address: 0 }
      })
      assert.strictEqual(wallet.protocol, Protocol.ETHEREUM)
      assert.strictEqual(
        wallet.address,
        '0xcf61eaf64d895c3c71a8812e9eedc4c179b4ed60'
      )
    })
    it('generate bitcoin wallet', async () => {
      const controller = new WalletController(config)
      const wallet = await controller.generateWallet({
        protocol: Protocol.BITCOIN,
        mnemonic,
        derivation: { address: 0 }
      })
      assert.strictEqual(wallet.protocol, Protocol.BITCOIN)
      assert.strictEqual(
        wallet.address,
        'mi5hP8CMZYanXLecyPmKeFo4xZFji7fiKF'
      )
    })
    it('generate bsc wallet', async () => {
      const controller = new WalletController(config)
      const wallet = await controller.generateWallet({
        protocol: Protocol.BSC,
        mnemonic,
        derivation: { address: 0 }
      })
      assert.strictEqual(wallet.protocol, Protocol.BSC)
      assert.strictEqual(
        wallet.address,
        '0xcf61eaf64d895c3c71a8812e9eedc4c179b4ed60'
      )
    })
    it('generate celo wallet', async () => {
      const controller = new WalletController(config)
      const wallet = await controller.generateWallet({
        protocol: Protocol.CELO,
        mnemonic,
        derivation: { address: 0 }
      })
      assert.strictEqual(wallet.protocol, Protocol.CELO)
      assert.strictEqual(
        wallet.address,
        '0xb8a29fa1876eb806e411f15d2d94c8e80fb72e23'
      )
    })
    it('generate ripple wallet', async () => {
      const controller = new WalletController(config)
      const wallet = await controller.generateWallet({
        protocol: Protocol.RIPPLE,
        mnemonic,
      })
      assert.strictEqual(wallet.protocol, Protocol.RIPPLE)
      assert.strictEqual(
        wallet.address,
        'rGcqB7ciEfDQpz9znXZSYXgEozqB5Xxhm'
      )
    })
    it('generate stellar wallet', async () => {
      const controller = new WalletController(config)
      const wallet = await controller.generateWallet({
        protocol: Protocol.STELLAR,
        mnemonic,
      })
      assert.strictEqual(wallet.protocol, Protocol.STELLAR)
      assert.strictEqual(
        wallet.publicKey,
        'GAC2V7MGMTG57FZKJSXRSZ4EIDL2RBFIYVXZJMTJZ232XPZQUCTYUCWL'
      )
    })
    it('generate hathor wallet', async () => {
      const controller = new WalletController(config)
      const wallet = await controller.generateWallet({
        protocol: Protocol.HATHOR,
        mnemonic,
        derivation:{address:0}
      })
      assert.strictEqual(wallet.protocol, Protocol.HATHOR)
      assert.strictEqual(
        wallet.address,
        'WgzYfVxZiL7bCN37Wj8myVY9HKZ5GCACsh'
      )
    })
  })

  describe('Generate wallet address from xpub', () => {
    it('bitcoin', async () => {
      const controller = new WalletController(config)
      const walletAddress = await controller.generateWalletAddressFromXpub({
        protocol: Protocol.BITCOIN,
        xpub: 'tpubDEFyQA3yezcuwZS9S8yTYP1kTV9d1RegHQPyAcdyFyURFpotMwM7VpHqwhBNweYuuSMLWG2733fjDwrx7vPk2CpS22zmG8g3U5JJmix3RKs',
        address: 0
      })
      assert.strictEqual(walletAddress, 'mi5hP8CMZYanXLecyPmKeFo4xZFji7fiKF')
    })
    it('ethereum', async () => {
      const controller = new WalletController(config)
      const walletAddress = await controller.generateWalletAddressFromXpub({
        protocol: Protocol.ETHEREUM,
        xpub: 'xpub6EWLCGwtcyjG8r8qBmF82Le6sA4FhQBfWtxUHvo7GDTZr1ch3FBbYbbCntYjvsRMK22NpvjtC9X87bahssEUpPEdU453fibMFhi3QS5sqjL',
        address: 0
      })
      assert.strictEqual(walletAddress, '0xcf61eaf64d895c3c71a8812e9eedc4c179b4ed60')
    })
    it('celo', async () => {
      const controller = new WalletController(config)
      const walletAddress = await controller.generateWalletAddressFromXpub({
        protocol: Protocol.CELO,
        xpub: 'xpub6EWLCGwtcyjG8r8qBmF82Le6sA4FhQBfWtxUHvo7GDTZr1ch3FBbYbbCntYjvsRMK22NpvjtC9X87bahssEUpPEdU453fibMFhi3QS5sqjL',
        address: 0
      })
      assert.strictEqual(walletAddress, '0xcf61eaf64d895c3c71a8812e9eedc4c179b4ed60')
    })
  })
})
