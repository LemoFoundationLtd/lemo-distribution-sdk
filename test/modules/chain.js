import {assert} from 'chai'
import LemoClient from '../../lib/index'
import {
    chainID,
    formattedCurrentBlock,
    formattedOneChangeLogBlock,
    formattedBlock0,
    formattedBlock1,
    currentHeight,
    formattedCandidateListRes,
    formattedDeputyNodes,
    nodeVersion,
    HxGasPriceAdvice,
    formattedTermRewardInfo,
    RewardValue,
} from '../datas'
import '../mock'
import {DEFAULT_POLL_DURATION} from '../../lib/const'
import errors from '../../lib/errors'


describe('module_chain_getNewestBlock', () => {
    it('newest block with body', async () => {
        const lemo = new LemoClient()
        const result = await lemo.getNewestBlock(true)
        assert.deepEqual(result, formattedCurrentBlock)
    })
    it('newest block without body', async () => {
        const lemo = new LemoClient()
        const result = await lemo.getNewestBlock(false)
        assert.deepEqual(result, {header: formattedCurrentBlock.header})
    })
    it('default parameter', async () => {
        const lemo = new LemoClient()
        const result = await lemo.getNewestBlock()
        assert.deepEqual(result, {header: formattedCurrentBlock.header})
    })
})

describe('module_chain_getBlock', () => {
    it('getBlockByHeight with body', async () => {
        const lemo = new LemoClient()
        const result = await lemo.getBlock(1, true)
        assert.deepEqual(result, formattedBlock1)
    })
    it('getBlockByHeight without body', async () => {
        const lemo = new LemoClient()
        const result = await lemo.getBlock(1)
        assert.deepEqual(result, {header: formattedBlock1.header})
    })
    it('getBlockByHeight(0)', async () => {
        const lemo = new LemoClient()
        const result = await lemo.getBlock(0)
        assert.deepEqual(result, {header: formattedBlock0.header})
    })
    it('getBlockByHash with body', async () => {
        const lemo = new LemoClient()
        const result = await lemo.getBlock(formattedBlock1.header.hash, true)
        assert.deepEqual(result, formattedBlock1)
    })
    it('getBlockByHash without body', async () => {
        const lemo = new LemoClient()
        const result = await lemo.getBlock(formattedBlock1.header.hash, false)
        assert.deepEqual(result, {header: formattedBlock1.header})
    })
    it('getBlockByHash not exist', async () => {
        const lemo = new LemoClient()
        const result = await lemo.getBlock('0x1234')
        assert.strictEqual(result, null)
    })
})

describe('module_chain_getNewestHeight', () => {
    it('default for getNewestHeight', async () => {
        const lemo = new LemoClient()
        const result = await lemo.getNewestHeight()
        assert.strictEqual(result, currentHeight)
    })
})

describe('module_chain_getGenesis', () => {
    it('getGenesis', async () => {
        const lemo = new LemoClient()
        const result = await lemo.getGenesis()
        assert.deepEqual(result, formattedOneChangeLogBlock)
    })
})

describe('module_chain_getChainID', () => {
    it('getChainID', async () => {
        const lemo = new LemoClient()
        const result = await lemo.getChainID()
        assert.strictEqual(result, chainID)
    })
})

describe('module_chain_getGasPriceAdvice', () => {
    it('getGasPriceAdvice', async () => {
        const lemo = new LemoClient()
        const result = await lemo.getGasPriceAdvice()
        assert.strictEqual(result, HxGasPriceAdvice)
    })
})

describe('module_chain_getDistributionVersion', () => {
    it('getNodeVersion', async () => {
        const lemo = new LemoClient()
        const result = await lemo.getDistributionVersion()
        assert.strictEqual(result, nodeVersion)
    })
})

describe('module_chain_watchBlock', () => {
    it('watchBlock without body', function itFunc(done) {
        this.timeout(DEFAULT_POLL_DURATION + 50)
        const lemo = new LemoClient()
        const watchId = lemo.watchBlock(false, block => {
            try {
                assert.deepEqual(block, {header: formattedCurrentBlock.header})
                done()
            } catch (e) {
                done(e)
            }
            lemo.stopWatchBlock(watchId)
        })
    })
    it('watchBlock with body', function itFunc(done) {
        this.timeout(DEFAULT_POLL_DURATION + 50)
        const lemo = new LemoClient()
        const watchId = lemo.watchBlock(true, block => {
            try {
                assert.deepEqual(block, formattedCurrentBlock)
                done()
            } catch (e) {
                done(e)
            }
            lemo.stopWatchBlock(watchId)
        })
    })
    it('multiple_watchBlock', function itFunc(done) {
        this.timeout(DEFAULT_POLL_DURATION + 50)
        const lemo = new LemoClient()
        const watchId1 = lemo.watchBlock(true, () => {
            done(new Error('make multiple requests at once'))
        })
        const watchId2 = lemo.watchBlock(true, () => {
            lemo.stopWatchBlock(watchId2)
            done()
        })
        lemo.stopWatchBlock(watchId1)
        assert.strictEqual(watchId1 + 1, watchId2)
    })
    it('multiple_watchBlock(false)_watchBlock(true)', function itFunc(done) {
        this.timeout(DEFAULT_POLL_DURATION + 50)
        const lemo = new LemoClient()
        const watchId1 = lemo.watchBlock(false, (block) => {
            assert.deepEqual(block, {header: formattedCurrentBlock.header})
            lemo.stopWatchBlock(watchId1)
        })
        const watchId2 = lemo.watchBlock(true, (block) => {
            assert.deepEqual(block, formattedCurrentBlock)
            lemo.stopWatchBlock(watchId2)
            done()
        })
    })
    it('stopWatchBlock without param', () => {
        const lemo = new LemoClient()
        const watchId = lemo.watchBlock(false, () => {
        })
        assert.throws(() => {
            lemo.stopWatchBlock()
        }, errors.InvalidWatchId())
        lemo.stopWatchBlock(watchId)
    })
})

describe('module_chain_getCandidateList', () => {
    it('got 2 candidates', async () => {
        const lemo = new LemoClient()
        const result = await lemo.getCandidateList(0, 10)
        assert.deepEqual(result, formattedCandidateListRes)
    })
    it('got 1 candidate', async () => {
        const lemo = new LemoClient()
        const result = await lemo.getCandidateList(0, 1)
        assert.strictEqual(result.candidateList.length, 1)
    })
    it('got 0 candidate', async () => {
        const lemo = new LemoClient()
        const result = await lemo.getCandidateList(0, 0)
        assert.strictEqual(result.candidateList.length, 0)
    })
})

describe('module_chain_getCandidateTop30', () => {
    it('got 2 candidates', async () => {
        const lemo = new LemoClient()
        const result = await lemo.getCandidateTop30()
        assert.deepEqual(result, formattedCandidateListRes.candidateList)
    })
})

describe('module_chain_getDeputyNodeList', () => {
    it('got 1 deputy nodes', async () => {
        const lemo = new LemoClient()
        const result = await lemo.getDeputyNodeList()
        assert.deepEqual(result, formattedDeputyNodes)
    })
    it('onlyBlockSigner is true', async () => {
        const lemo = new LemoClient()
        const result = await lemo.getDeputyNodeList(true)
        assert.deepEqual(result, formattedDeputyNodes)
    })
    it('onlyBlockSigner is false', async () => {
        const lemo = new LemoClient()
        const result = await lemo.getDeputyNodeList(false)
        assert.deepEqual(result, formattedDeputyNodes)
    })
})

describe('module_account_getTermReward', () => {
    it('normal_account_getTermReward', async () => {
        const lemo = new LemoClient({chainID})
        const result = await lemo.getTermReward(10001)
        assert.deepEqual(result, formattedTermRewardInfo)
    })
    it('error', async () => {
        const lemo = new LemoClient({chainID})
        const expectedErr = errors.InvalidHeight()
        return lemo.getTermReward('10001').then(() => {
            assert.fail('success', `throw error: ${expectedErr}`)
        }, e => {
            return assert.strictEqual(e.message, expectedErr)
        })
    })
})

describe('module_account_getAllRewardValue', () => {
    it('normal_account_getAllRewardValue', async () => {
        const lemo = new LemoClient({chainID})
        const result = await lemo.getAllRewardValue()
        assert.deepEqual(result, {RewardValue})
    })
})
