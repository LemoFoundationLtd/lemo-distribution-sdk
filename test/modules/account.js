import {assert} from 'chai'
import LemoClient from '../../lib/index'
import {
    chainID,
    miner,
    formatedMiner,
    formattedEquities,
    creatAsset,
    assetToken1,
    assetToken2,
    equitiesResList,
} from '../datas'

import '../mock'
import errors from '../../lib/errors'

describe('module_account_getAccount', () => {
    it('account with miner balance', async () => {
        const lemo = new LemoClient()
        const result = await lemo.account.getAccount(miner.address)
        assert.deepEqual(result, formatedMiner)
    })
    it('account with special balance', async () => {
        const lemo = new LemoClient()
        const addr = '0x015780F8456F9c1532645087a19DcF9a7e0c7F97'
        const expectedErr = errors.InvalidAddress(addr)
        return lemo.account.getAccount(addr).then(() => {
            assert.fail('success', `throw error: ${expectedErr}`)
        }, e => {
            return assert.strictEqual(e.message, expectedErr)
        })
    })

    it('account is empty', async () => {
        const lemo = new LemoClient()
        const addr = ''
        const expectedErr = errors.InvalidAddress(addr)
        return lemo.account.getAccount(addr).then(() => {
            assert.fail('success', `throw error: ${expectedErr}`)
        }, e => {
            return assert.strictEqual(e.message, expectedErr)
        })
    })
})

describe('module_account_getCandidateInfo', () => {
    it('candidate', async () => {
        const lemo = new LemoClient()
        const result = await lemo.account.getCandidateInfo(miner.address)
        assert.deepEqual(result, formatedMiner.candidate)
    })
    it('not candidate', async () => {
        const lemo = new LemoClient()
        const result = await lemo.account.getCandidateInfo('Lemo846Q4NQCKJ2YWY6GHTSQHC7K24JDC7CPCWYH')
        assert.strictEqual(result, undefined)
    })
    it('error candidate', () => {
        const lemo = new LemoClient()
        const addr = '0x015780F8456F9c1532645087a19DcF9a7e0c7F97'
        const expectedErr = errors.InvalidAddress(addr)
        return lemo.account.getCandidateInfo(addr).then(() => {
            assert.fail('success', `throw error: ${expectedErr}`)
        }, e => {
            return assert.strictEqual(e.message, expectedErr)
        })
    })
})

describe('module_account_getBalance', () => {
    it('no-balance', async () => {
        const lemo = new LemoClient()
        const result = await lemo.account.getBalance('Lemo846Q4NQCKJ2YWY6GHTSQHC7K24JDC7CPCWYH')
        assert.strictEqual(result, '0')
    })
    it('balance', async () => {
        const lemo = new LemoClient()
        const result = await lemo.account.getBalance('Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG')
        assert.strictEqual(result, '1599999999999999999999999900')
    })
    it('getBalance_error', async () => {
        const lemo = new LemoClient()
        const addr = '0x015780F8456F9c1532645087a19DcF9a7e0c7F97'
        try {
            await lemo.account.getBalance(addr)
        } catch (e) {
            assert.strictEqual(e.message, errors.InvalidAddress(addr))
            return
        }
        assert.fail(undefined, errors.InvalidAddress(addr))
    })
})

describe('module_account_getEquity', () => {
    it('equities', async () => {
        const lemo = new LemoClient({chainID, host: '127.0.0.1:8001'})
        const result = await lemo.account.getEquity('Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D', equitiesResList[0].assetId)
        assert.deepEqual(result, formattedEquities[0])
    })
})

describe('module_account_getEquityList', () => {
    it('equities', async () => {
        const lemo = new LemoClient({chainID, host: '127.0.0.1:8001'})
        const result = await lemo.account.getEquityList('Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D', 0, 10)
        assert.deepEqual(result.equities, formattedEquities)
        assert.strictEqual(result.total, formattedEquities.length)
    })
    it('0 equity', async () => {
        const lemo = new LemoClient({chainID, host: '127.0.0.1:8001'})
        const result = await lemo.account.getEquityList('Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24A', 0, 10)
        assert.strictEqual(result.equities.length, 0)
        assert.strictEqual(result.total, 0)
    })
    it('get from invalid account', async () => {
        const lemo = new LemoClient({chainID, host: '127.0.0.1:8001'})
        const addr = 'abc'
        try {
            await lemo.account.getEquityList(addr, 0, 10)
        } catch (e) {
            assert.strictEqual(e.message, errors.InvalidAddress(addr))
            return
        }
        assert.fail(undefined, errors.InvalidAddress(addr))
    })
})

describe('module_account_getEquityListByAssetCode', () => {
    it('equities', async () => {
        const lemo = new LemoClient({chainID, host: '127.0.0.1:8001'})
        const result = await lemo.account.getEquityListByAssetCode('Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D', equitiesResList[0].assetCode, 0, 10)
        assert.deepEqual(result.equities[0], formattedEquities[0])
        assert.strictEqual(result.total, 1)
    })
    it('0 equity', async () => {
        const lemo = new LemoClient({chainID, host: '127.0.0.1:8001'})
        const result = await lemo.account.getEquityListByAssetCode('Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24A', '0xabcd', 0, 10)
        assert.strictEqual(result.equities.length, 0)
        assert.strictEqual(result.total, 0)
    })
    it('get from invalid account', async () => {
        const lemo = new LemoClient({chainID, host: '127.0.0.1:8001'})
        const addr = 'abc'
        try {
            await lemo.account.getEquityListByAssetCode(addr, equitiesResList[0].assetId, 0, 10)
        } catch (e) {
            assert.strictEqual(e.message, errors.InvalidAddress(addr))
            return
        }
        assert.fail(undefined, errors.InvalidAddress(addr))
    })
})

describe('module_account_getAssetInfo', () => {
    it('normal_account_getAssetInfo', async () => {
        const lemo = new LemoClient({chainID})
        const result = await lemo.account.getAssetInfo('0xd0befd3850c574b7f6ad6f7943fe19b212affb90162978adc2193a035ced8884')
        assert.strictEqual(result.category, creatAsset.category)
        assert.strictEqual(result.profile.suggestedGasLimit, creatAsset.profile.suggestedGasLimit)
    })
})

describe('module_account_getAssetToken', () => {
    it('normal_account_getAssetToken', async () => {
        const lemo = new LemoClient({chainID})
        const result = await lemo.account.getAssetToken('0x34b04e018488f37f449193af2f24feb3b034c994cde95d30e3181403ac76528a')
        assert.strictEqual(result.assetCode, assetToken1.assetCode)
        assert.strictEqual(result.metaData, assetToken1.metaData)
    })
    it('no_metaData', async () => {
        const lemo = new LemoClient({chainID})
        const result = await lemo.account.getAssetToken('0x34b04e018488f37f449193af2f24feb3b034c994cde95d30e3181403ac76652v')
        assert.strictEqual(result.assetCode, assetToken2.assetCode)
        assert.strictEqual(result.owner, assetToken2.owner)
        assert.strictEqual(result.metaData, '')
    })
})
