![Logo of the project](./logo.png)

# LemoChain Distribution SDK

[![npm](https://img.shields.io/npm/v/lemo-client.svg?style=flat-square)](https://www.npmjs.com/package/lemo-client)
[![Build Status](https://travis-ci.org/LemoFoundationLtd/lemo-client.svg?branch=master)](https://travis-ci.org/LemoFoundationLtd/lemo-client)
[![code coverage](https://img.shields.io/coveralls/LemoFoundationLtd/lemo-client.svg?style=flat-square)](https://coveralls.io/github/LemoFoundationLtd/lemo-client)
[![GitHub license](https://img.shields.io/badge/license-LGPL3.0-blue.svg?style=flat-square)](https://github.com/LemoFoundationLtd/lemo-client/blob/master/LICENSE)

通过 JSON RPC 协议访问 LemoChain 分发节点上的数据

> 需要先在本地通过`--rpc`参数启动一个[LemoChain 分发节点](https://github.com/LemoFoundationLtd/lemochain-distribution)，或远程连接到一个已存在的 LemoChain 分发节点，才能运行本项目

## 安装

### 使用 Yarn

```bash 
yarn add lemo-client
```

### 在浏览器中引入

-   在 html 中引入 `lemo-client.min.js` 文件
-   通过全局变量 `LemoClient` 使用 SDK

## 示例

```js
const LemoClient = require('lemo-client')
const lemo = new LemoClient({
    host: 'http://127.0.0.1:8001'
})

lemo.getBlock(0).then(function(block) {
    console.log(block)
})
```

## LemoChain API
> 所有异步接口都返回 Promise 对象  
> 所有接口都可在 LemoChain 分发节点的控制台中使用，但通过远程连接（如 http、websocket）到节点时，只能使用部分接口

API | 功能 | 异步
---|---|---
[lemo.getBlock(heightOrHash, withBody)](#submodule-chain-getBlock) | 根据高度或 hash 获取区块 | ✓
[lemo.getNewestBlock(withBody)](#submodule-chain-getNewestBlock) | 获取最新的块 | ✓
[lemo.getNewestHeight()](#submodule-chain-getNewestHeight) | 获取最新高度 | ✓
[lemo.getGenesis()](#submodule-chain-getGenesis) | 获取创世区块 | ✓
[lemo.getChainID()](#submodule-chain-getChainID) | 获取当前链 ID | ✓
[lemo.getGasPriceAdvice()](#submodule-chain-getGasPriceAdvice) | 获取建议 gas 价格 | ✓
[lemo.getCandidateList()](#submodule-chain-getCandidateList) | 分页获取候选节点列表 | ✓
[lemo.getCandidateTop30()](#submodule-chain-getCandidateTop30) | 获取排名前30的候选节点列表 | ✓
[lemo.getDeputyNodeList(onlyBlockSigner)](#submodule-chain-getDeputyNodeList) | 获取当前所有共识节点的信息列表 | ✓
[lemo.getTermReward(height)](#submodule-chain-getTermReward) | 获取换届奖励信息 | ✓
[lemo.getAllRewardValue()](#submodule-chain-getAllRewardValue) | 获取所有的收益值 | ✓ | 
[lemo.getDistributionVersion()](#submodule-chain-getDistributionVersion) | 获取分发节点的版本号 | ✓
[lemo.watchBlock(withBody, callback)](#submodule-chain-watchBlock) | 监听新的区块 |
[lemo.stopWatchBlock(subscribeId)](#submodule-chain-stopWatchBlock) | 停止监听区块 |
[lemo.account.newKeyPair()](#submodule-account-newKeyPair) | 创新账户公私钥 | ✓
[lemo.account.getBalance(addr)](#submodule-account-getBalance) | 获取账户余额 | ✓
[lemo.account.getAccount(addr)](#submodule-account-getAccount) | 获取账户信息 | ✓
[lemo.account.getCandidateInfo(addr)](#submodule-account-getCandidateInfo) | 获取候选人信息 | ✓
[lemo.account.getEquity(address, assetId)](#submodule-account-getEquity) | 获取指定账户持有的指定资产权益 | ✓
[lemo.account.getEquityList(address, index, limit)](#submodule-account-getEquityList) | 获取指定账户持有的所有资产权益 | ✓
[lemo.account.getEquityListByAssetCode(address, assetCode, index, limit)](#submodule-account-getEquityListByAssetCode) | 根据资产Code获取指定账户持有的相关资产权益 | ✓
[lemo.account.getAssetInfo(assetCode)](#submodule-account-getAssetInfo) | 获取指定资产类型的发行信息 | ✓
[lemo.account.getAssetToken(assetId)](#submodule-account-getAssetToken) | 获取指定资产通证的发行数据 | ✓
[lemo.account.createTempAddress(from, userId)](#submodule-account-createTempAddress) | 创建临时账户 |
[lemo.account.isTempAddress(address)](#submodule-account-isTempAddress) | 是否是临时账户 |
[lemo.account.isContractAddress(address)](#submodule-account-isContractAddress) | 是否是合约账户 |
[lemo.tx.getTx(txHash)](#submodule-tx-getTx) | 根据交易hash获取交易 | ✓
[lemo.tx.getTxListByAddress(address, index, limit)](#submodule-tx-getTxListByAddress) | 根据账户地址分页拉取交易列表 | ✓
[lemo.tx.getTxListByType(address, txType, index, limit)](#submodule-tx-getTxListByType) | 根据账户地址和交易类型分页拉取交易列表 | ✓
[lemo.tx.getAssetTxList(address, assetCodeOrId, index, limit)](#submodule-tx-getAssetTxList) | 根据账户地址和资产Code或资产Id分页拉取交易列表 | ✓
[lemo.tx.send(signedTxInfo, privateKey)](#submodule-tx-send) | 发送交易并返回交易hash字符串 | ✓
[lemo.tx.waitConfirm(txHash)](#submodule-tx-waitConfirm) | 等待交易上链 | ✓
[lemo.tx.watchTx(filterTxConfig, callback)](#submodule-tx-watchTx) | 监听过滤区块的交易 |
[lemo.tx.stopWatchTx(subscribeId)](#submodule-tx-stopWatchTx) | 停止指定交易 |
[lemo.stopWatch()](#submodule-global-stopWatch) | 停止所有轮询 |
[lemo.isWatching()](#submodule-global-isWatching) | 是否正在轮询 |


类属性 | 描述
---|---
[LemoClient.SDK_VERSION](#submodule-tool-SDK_VERSION) | js SDK 版本号
[LemoClient.TxType](#submodule-tool-TxType) | 交易类型枚举
[LemoClient.ChangeLogType](#submodule-tool-ChangeLogType) | 修改记录类型枚举
[LemoClient.BigNumber](https://github.com/MikeMcl/bignumber.js) | 大数处理库 |

---

### 协议
以 json 格式收发数据，遵循[JSON-RPC2.0](https://www.jsonrpc.org/specification)标准  
方便起见，所有数字都需要转换为字符串，以避免数值溢出的情况

#### POST 请求
```
{
    "jsonrpc": "2.0",
    "method": "chain_getBlockByHeight",
    "params": [1, false],
    "id": 1
}
```
- `jsonrpc` - (string) 固定为`2.0`
- `method` - (string) API 模块名和方法名，以下划线连接
- `params` - (Array) API 方法参数列表，直接以对象形式传递参数
- `id` - (number) 递增的请求 id

#### 正常回包
```
{
    "jsonrpc": "2.0",
    "result": {...},
    "id": 1
}
```
- `jsonrpc` - (string) 固定为`2.0`
- `result` - (\*) 返回的数据，可以是任意类型
- `id` - (number) 对应的请求 id

#### 异常回包
```
{
    "jsonrpc": "2.0",
    "error": {"code": -32601, "message": "Method not found"},
    "id": 1
}
```
- `jsonrpc` - (string) 固定为`2.0`
- `error` - (object) 异常信息，包含一个负数`code`和一个描述字符串`message`
- `id` - (number) 对应的请求 id

---

### 数据结构

<a name="data-structure-block"></a>

#### block

```json
{
    "header": {},
    "transactions": [],
    "changeLogs": [],
    "confirms": [],
    "events": [],
    "deputyNodes": []
}
```
- `header` [区块头](#data-structure-header)
- `transactions` 该块中打包的所有[交易](#data-structure-transaction)列表
- `changeLogs` 该块对链上数据的[修改记录](#data-structure-changeLog)列表
- `confirms` 各共识节点验证区块通过后，对该块 hash 的[签名](#data-structure-confirm)列表
- `events` 该块中所有交易产生的[合约事件](#data-structure-event)列表
- `deputyNodes` 如果该块是一个`快照块`，则这里保存新一代[共识节点信息](#data-structure-deputyNode)的列表。否则为空

<a name="data-structure-header"></a>
#### header
区块头
```json
{
    "hash": "0x11d9153b14adb92a14c16b66c3524d62b4742c0e7d375025525e2f131de37a8b",
    "height": "0",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "miner": "Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG",
    "signData": "0x",
    "timestamp": "1535630400",
    "gasLimit": "105000000",
    "gasUsed": "0",
    "eventBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "changeLogRoot": "0x93273cebb4f0728991811d5d7c57ae8f88a83524eedb0af48b3061ed2e8017b8",
    "deputyRoot": "0x49b613bbdf76be3fe761fd60d1ade6d2835315047c53d6e8199737898b8d9b47",
    "eventRoot": "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
    "transactionRoot": "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
    "versionRoot": "0x1e78c4779248d3d8d3cd9b77bf7b67b4c759ec87d45d52a3e79c928290773f4c",
    "extraData": ""
}
```
- `hash` 区块 hash
- `height` 区块高度
- `parentHash` 上一个区块的 hash
- `miner` 出块者的账户地址
- `signData` 出块者对区块 hash 的签名
- `timestamp` 出块时间戳，单位为秒
- `gasLimit` 该块中打包的交易消耗的总 gas 上限
- `gasUsed` 该块中打包的交易消耗的实际 gas
- `eventBloom` 对区块中的`events`计算出的 Bloom 过滤器，用来快速查询合约事件
- `changeLogRoot` 将区块中的`changeLogs`以 Merkle 树的形式组织起来，得到的根节点 hash
- `deputyRoot` 将区块中的`deputyNodes`以 Merkle 树的形式组织起来，得到的根节点 hash
- `eventRoot` 将区块中的`events`以 Merkle 树的形式组织起来，得到的根节点 hash
- `transactionRoot` 将区块中的`transactions`以 Merkle 树的形式组织起来，得到的根节点 hash
- `versionRoot` 该块打包时全局账户版本树的根节点 hash
- `extraData` (可选) 出块者向区块中添加的自定义信息

<a name="data-structure-transaction"></a>
#### transaction
交易
```json
{
    "type": "1",
    "chainID": "1",
    "version": "1",
    "from": "Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D",
    "to": "Lemo83JW7TBPA7P2P6AR9ZC2WCQJYRNHZ4NJD4CY",
    "gasPayer": "",
    "toName": "",
    "amount": "100",
    "data": "0x",
    "expirationTime": 1541566996,
    "gasLimit": 2000000,
    "gasPrice": "3000000000",
    "hash": "0x6d3062a9f5d4400b2002b436bc69485449891c83e23bf9e27229234da5b25dcf",
    "message": "",
    "sigs": ["0xd9a9f9f41ea020185a6480fe6938d776f0a675d89057c071fc890e09742a4dd96edb9d48c9978c2f12fbde0d0445f2ff5f08a448b91469511c663567d0b015f601"],
    "gasPayerSigs": ["0x800be6a0cf31ab9e86d547fb8cf964339276233a2b260ad8a4b4c93b39a48d6b1761e125f601bc6953e30eaad3e698c12add332a5740f1618915c12432dc610601"]
}
```
- `type` 交易类型
- `chainID` LemoChain的ID
- `version` 当前交易版本，介于0-128之间
- `from` 交易发送者的账户地址
- `to` 交易接收者的账户地址
- `gasPayer` 代付gas的账户地址
- `toName` (可选) 交易接收者的账户名，会与账户地址进行比对校验。类似银行转账时填写的姓名与卡号的关系。最大长度为100字符
- `amount` 交易金额，`BigNumber`对象，单位`mo`。1`LEMO`=1000000000000000000`mo`=1e18`mo`
- `data` (可选) 交易附带的数据，可用于调用智能合约。根据交易类型也会有不同的作用
- `expirationTime` 交易过期时间戳，单位为秒。如果交易过期时间在半小时以后，则可能不会被打包，这取决于节点交易池的配置
- `gasLimit` 交易消耗的 gas 上限。如果超过这个限制还没运行结束，则交易失败，并且 gas 费用不退还
- `gasPrice` 交易消耗 gas 的单价，`BigNumber`对象，单位为`mo`。单价越高越优先被打包
- `hash` 交易 hash
- `message` (可选) 交易附带的文本消息。最大长度为1024字符
- `sigs` 交易签名数组，每个字段长度为65个字节
- `gasPayerSigs` 代付 gas 交易签名数组，每个字段长度为65个字节

<a name="data-transaction-type"></a>

交易类型 | 数值 | 说明
---|---|---
lemo.TxType.ORDINARY | 0 | 普通转账交易或合约执行交易
lemo.TxType.CREATE_CONTRACT | 1 | 创建智能合约交易
lemo.TxType.VOTE | 2 | 设置投票对象
lemo.TxType.CANDIDATE | 3 | 注册或修改候选人信息
lemo.TxType.CREATE_ASSET | 4 | 创建资产信息
lemo.TxType.ISSUE_ASSET | 5 | 发行资产
lemo.TxType.REPLENISH_ASSET | 6 | 增发资产交易
lemo.TxType.MODIFY_ASSET | 7 | 修改资产交易
lemo.TxType.TRANSFER_ASSET| 8 | 交易资产
lemo.TxType.MODIFY_SIGNER| 9 | 修改多重签名
lemo.TxType.BOX_TX| 10 | 箱子交易，打包多笔交易，事务性地运行它们

chainID | 说明
---|---
1 | LemoChain 主网
100 | LemoChain 测试网

<a name="data-structure-asset"></a>
#### asset
资产信息
```json
{
    "category": "1",
    "decimal": 18,
    "totalSupply": "15000000000000000000",
    "isReplenishable": true,
    "isDivisible": true,
    "issuer": "Lemo83GWNWJQ3DQFN6F24WFZF5TGQ39A696GJ7Z3",
    "profile": {
        "name": "Demo Asset",
        "symbol": "DT",
        "description": "this is a asset information",
        "suggestedGasLimit": "60000",
        "freeze": "false"
    }
}
```
- `category` 资产类型
- `decimal` 发行资产的小数位，表示将总数细化到小数点后多少位，默认为18位
- `totalSupply` 发行的资产总量，当资产在增发和销毁时发行的资产总量会实时变化，发行资产总量为`发行量*10^decimal`
- `isReplenishable` 该资产是否可增发，在创建资产时设置，设置后不可再次修改，默认为`true`
- `isDivisible` 该资产是否可分割，在创建资产时设置，设置后不可再次修改，默认为`true`
- `issuer` 发行者地址，根据创建资产时的签名字段得到
- `profile` 资产的其他信息，此部分内容可以再次修改
    - `name` 创建该资产时的资产名称
    - `symbol` 资产标识
    - `description` 资产基本信息
    - `suggestedGasLimit` 交易消耗的gas上限，和`gasLimit`相同用法，创建资产时由用户自己设置，默认为60000
    - `freeze` 是否冻结资产，默认为`false`，将其设置为`true`可以停止该资产除查询以外的一切操作

<a name="data-asset-category"></a>

| category| 说明          |
| ------- | -------------- |
| 1       | 通证资产，和以太坊的ERC20代币类似，发行时可以设置是否允许今后增发，用户收到币后可以任意分割转账 |
| 2       | 非同质化资产，和以太坊的ERC721代币类似，可以携带少量资产信息，并且不可分割 |
| 3       | 通用资产，更加灵活的数字资产，适用于更加复杂的场景，以上两种资产都由通用资产特化而来 |

<a name="data-structure-equity"></a>
#### equity
记录资产持有者的资产信息，保存在持有者的账户中
```json
{
    "assetCode": "0xd0befd3850c574b7f6ad6f7943fe19b212affb90162978adc2193a035ced8884",
    "assetId": "0x34b04e018488f37f449193af2f24feb3b034c994cde95d30e3181403ac76528a",
    "balance": "15000000000000000000"
}
```
- `assetCode` 资产码，创建资产时得到
- `assetId` 资产Id，发行资产时得到，如果资产类型为1，则 assetCode 和 assetId 相同
- `balance` 资产余额，单位是`mo`

<a name="data-structure-changeLog"></a>
#### changeLog
交易对链上数据的修改记录
```json
{
    "address": "Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG",
    "extra": "",
    "newValue": "0x8c052b7d2dcc80cd2e40000000",
    "type": "BalanceLog",
    "version": 1
}
```
- `address` 产生了数据变化的账号地址
- `version` 账户数据的版本号，每种`type`的数据版本号彼此独立
- 根据`type`的不同，`newValue`和`extra`内保存的数据也不同

<a name="data-change-log-type"></a>

type | 数值 | 功能 | newValue | extra
---|---|---|---|---
lemo.ChangeLogType.BalanceLog | 1 | 账户余额变化 | 新的余额 | -
lemo.ChangeLogType.StorageLog | 2 | 合约账户存储数据变化 | value | key
lemo.ChangeLogType.StorageRootLog | 3 | 合约账户存储树的根节点变化 | 存储树的根节点hash | -
lemo.ChangeLogType.AssetCodeLog | 4 | 创建资产类型信息 | 完整的资产类型信息 | 资产code
lemo.ChangeLogType.AssetCodeStateLog | 5 | 修改资产类型信息中的字段 | 字段值 | 资产code和字段key
lemo.ChangeLogType.AssetCodeRootLog | 6 | 账户创建的资产类型信息的树的根节点变化 | 资产类型信息树的根节点hash | -
lemo.ChangeLogType.AssetCodeTotalSupplyLog | 7 | 发行、增发或销毁资产 | 资产总量 | 资产code
lemo.ChangeLogType.AssetIdLog | 8 | 发行资产通证或修改其metadata | 资产通证中的metadata | 资产id
lemo.ChangeLogType.AssetIdRootLog | 9 | 账户发行的资产通证信息的树的根节点变化 | 资产通证信息树的根节点hash | -
lemo.ChangeLogType.EquityLog | 10 | 账户持有资产的余额变化 | 资产余额信息 | 资产id
lemo.ChangeLogType.EquityRootLog | 11 | 账户持有资产的余额树的根节点变化 | 资产余额树的根节点hash | -
lemo.ChangeLogType.CandidateLog | 12 | 创建或修改竞选信息 | 竞选信息对象 | -
lemo.ChangeLogType.CandidateStateLog | 13 | 账户竞选信息的某字段变化 | 字段值 | 字段key
lemo.ChangeLogType.CodeLog | 14 | 创建合约账户 | 合约 code | -
lemo.ChangeLogType.AddEventLog | 15 | 产生一条合约日志 | 合约日志 | -
lemo.ChangeLogType.SuicideLog | 16 | 销毁合约账户 | - | -
lemo.ChangeLogType.VoteForLog | 17 | 修改投票对象账号地址 | 新的投票对象地址 | -
lemo.ChangeLogType.VotesLog | 18 | 候选者收到的票数变化 | 新的票数 | -
lemo.ChangeLogType.SignersLog | 19 | 多重签名账户的变化 | 多重签名对象 | -

<a name="data-structure-confirm"></a>
#### confirm
共识节点验证区块通过后，对该块 hash 的签名
```
0x1234
```

<a name="data-structure-event"></a>
#### event
合约事件
```json
{
    "address": "Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG"
}
```

<a name="data-structure-deputyNode"></a>
#### deputyNode
共识节点的信息
```json
{
    "minerAddress": "Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG",
    "nodeID": "0x5e3600755f9b512a65603b38e30885c98cbac70259c3235c9b3f42ee563b480edea351ba0ff5748a638fe0aeff5d845bf37a3b437831871b48fd32f33cd9a3c0",
    "host": "127.0.0.1",
    "port": "7001",
    "votes": "50000"
}
```
- `minerAddress` 节点的挖矿收益账号地址
- `nodeID` 节点的 ID，即节点对区块签名时的私钥对应的公钥。长度为130个字符，需要加`0x`
- `host` 节点的 IP 地址或域名。最大长度为128字符
- `port` 与其它节点连接用的端口号
- `votes` 节点的总票数

<a name="data-structure-account"></a>
#### account
账户信息
```json
{
    "address": "Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG",
    "assetCodeRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "assetIdRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "balance": "1599999999999999999999999900",
    "records": {
        "BalanceLog": {
            "version": 3,
            "height": 1
        }
    },
    "codeHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "equityRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "root": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "txCount": 0,
    "voteFor": "Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG",
    "candidate": {
        "votes": "1599999000",
        "profile": {
            "host": "www.lemochain.com",
            "isCandidate": "true",
            "minerAddress": "Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG",
            "nodeID": "0x5e3600755f9b512a65603b38e30885c98cbac70259c3235c9b3f42ee563b480edea351ba0ff5748a638fe0aeff5d845bf37a3b437831871b48fd32f33cd9a3c0",
            "port": "7001"
        }
    },
    "signers": [{"address": "Lemo83JW7TBPA7P2P6AR9ZC2WCQJYRNHZ4NJD4CY","weight": "60"}, {"address": "Lemo842BJZ4DKCC764C63Y6A943775JH6NQ3Z33Y", "weight":  "50"}]
}
```
- `address` 账户地址
- `assetCodeRoot` 创建过的资产树的根节点 hash
- `assetIdRoot` 发行过的资产树的根节点 hash
- `balance` 账户余额，`BigNumber`对象，并且有`toMoney()`方法可以输出格式化金额
- `records` 账户数据的修改记录对象。其中 key 是[ChangeLog](data-structure-changeLog)的类型，value 是该类型对应最新的那一条`ChangeLog`的版本号和所在的区块高度
- `codeHash` 合约账户的代码 hash
- `equityRoot` 资产余额树的根节点hash
- `root` 合约账户的存储树根节点 hash
- `txCount` 账户收到或发送的交易数量
- `voteFor` 投票对象的账户地址
- `candidate` 如果是候选者账户，则该字段不为空
    - `votes` 候选者收到的总票数
    - `profile` 候选者信息
        - `host` 候选者的节点服务器连接地址，可以是IP或域名
        - `isCandidate` 该账户是否是候选者。用来取消候选者身份
        - `minerAddress` 节点的挖矿收益账号地址
        - `nodeID` 节点的 ID，即节点对区块签名时的私钥对应的公钥。长度为130个字符，需要加`0x`
        - `port` 候选者的节点服务器端口号
- `signers` 多签账户的签名者列表。若不为空，则需要集齐权重总和超过100的多位签名者的签名才可以发送交易
    - `address` 签名者的账户地址
    - `weight` 签名者的权重

---

### 构造函数
```
lemo = new LemoClient({
    chainID: 1, 
    host: 'http://127.0.0.1:8001'
})
```
- `chainID` 区块链的 ID，默认值为`1`，即 LemoChain 主链
- `host` LemoChain 节点的 HTTP 连接地址。默认值`http://127.0.0.1:8001`
    > 注意: 如果连接后出现跨域问题，则需要用参数`--rpccorsdomain http://sdk所在web的域名:端口号`的方式启动 LemoChain 节点

---

### chain 模块 API

<a name="submodule-chain-getBlock"></a>
#### lemo.getBlock
```
lemo.getBlock(heightOrHash [, withBody])
```
根据高度或 hash 获取区块

##### Parameters
1. `number|string` - 区块高度或 hash 字符串。如果是高度，则只能获取稳定块（经过多数共识节点签名确认的区块）
2. `boolean` - (可选) 是否获取交易列表等区块体内容。默认为`false`

##### Returns
`Promise` - 通过`then`可以获取到[区块对象](#data-structure-block)

##### Example
```js
lemo.getBlock(0).then(function(block) {
    console.log(block.header.hash) // "0x11d9153b14adb92a14c16b66c3524d62b4742c0e7d375025525e2f131de37a8b"
})
```

---

<a name="submodule-chain-getNewestBlock"></a>
#### lemo.getNewestBlock
```
lemo.getNewestBlock([withBody])
```
获取最新的块

##### Parameters
1. `boolean` - (可选) 是否获取交易列表等区块体内容。默认为`false`

##### Returns
`Promise` - 通过`then`可以获取到[区块对象](#data-structure-block)

##### Example
```js
lemo.getNewestBlock(true).then(function(block) {
    console.log(block.header.miner) // "Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG"
})
```

---

<a name="submodule-chain-getNewestHeight"></a>
#### lemo.getNewestHeight
```
lemo.getNewestHeight()
```
获取最新块高度

##### Parameters
无

##### Returns
`Promise` - 通过`then`可以获取到当前区块高度

##### Example
```js
lemo.getNewestHeight().then(function(height) {
    console.log(height) // "100"
})
```

---

<a name="submodule-chain-getGenesis"></a>
#### lemo.getGenesis
```
lemo.getGenesis()
```
获取创世区块

##### Parameters
无

##### Returns
`Promise` - 通过`then`可以获取到[区块对象](#data-structure-block)

##### Example
```js
lemo.getGenesis().then(function(block) {
    console.log(block.header.parentHash) // "0x0000000000000000000000000000000000000000000000000000000000000000"
})
```

---

<a name="submodule-chain-getChainID"></a>
#### lemo.getChainID
```
lemo.getChainID()
```
获取 LemoChain 节点的当前链 ID

##### Parameters
无

##### Returns
`Promise` - 通过`then`可以获取到当前 chainID

##### Example
```js
lemo.getChainID().then(function(chainID) {
    console.log(chainID) // "1"
})
```

---

<a name="submodule-chain-getGasPriceAdvice"></a>
#### lemo.getGasPriceAdvice
```
lemo.getGasPriceAdvice()
```
获取建议 gas 价格

##### Parameters
无

##### Returns
`Promise` - 通过`then`可以获取到建议 gas 价格，单位为`mo`

##### Example
```js
lemo.getGasPriceAdvice().then(function(gasPrice) {
    console.log(gasPrice.toMoney()) // "2000000000"
})
```

---

<a name="submodule-chain-getCandidateList"></a>
#### lemo.getCandidateList
```
lemo.getCandidateList(index, limit)
```
分页获取候选节点列表

##### Parameters
1. `number` - 要获取的候选人信息起始序号
2. `number` - 获取候选人信息的最大条数

##### Returns
`Promise` - 通过`then`可以获取到一个`{candidateList:Array, total:number}`对象  
    - `candidateList` 候选人信息数组。与[账户信息](#data-structure-account)中的`candidate`对象一致，只是在这个候选人信息中增加了一个`address`字段，表示账户地址  
    - `total` 候选人的总数  

##### Example
```js
lemo.getCandidateList(0, 10).then(function(result) {
    console.log(result.total) // 1
    console.log(result.candidateList[0].address) // Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG
    console.log(JSON.stringify(result.candidateList)) // [{"address":"Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG","profile":{"host":"127.0.0.1","isCandidate":true,"minerAddress":"Lemobw","nodeID":"0x5e3600755f9b512a65603b38e30885c98cbac70259c3235c9b3f42ee563b480edea351ba0ff5748a638fe0aeff5d845bf37a3b437831871b48fd32f33cd9a3c0","port":7001},"votes":"1599999000"}]
})
```

---

<a name="submodule-chain-getCandidateTop30"></a>
#### lemo.getCandidateTop30
```
lemo.getCandidateTop30()
```
获取排名前30的候选节点列表

##### Parameters
无

##### Returns
`Promise` - 通过`then`可以获取到候选人信息对象的数组。这里的候选人信息与[账户信息](#data-structure-account)中的`candidate`对象一致，只是在这个候选人信息中增加了一个`address`字段，表示账户地址  

##### Example
```js
lemo.getCandidateTop30().then(function(candidateList) {
    console.log(candidateList.length) // 1
    console.log(candidateList[0].address) // Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG
    console.log(JSON.stringify(candidateList)) // [{"address":"Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG","profile":{"host":"127.0.0.1","isCandidate":true,"minerAddress":"Lemobw","nodeID":"0x5e3600755f9b512a65603b38e30885c98cbac70259c3235c9b3f42ee563b480edea351ba0ff5748a638fe0aeff5d845bf37a3b437831871b48fd32f33cd9a3c0","port":7001},"votes":"1599999000"}]
})
```

---

<a name="submodule-chain-getDeputyNodeList"></a>
#### lemo.getDeputyNodeList
```
lemo.getDeputyNodeList(onlyBlockSigner)
```
获取当前所有共识节点的信息

##### Parameters
1. `boolean` - （可选）若为true则获取当前可对区块进行签名的共识节点信息，false则获取当前已当选的共识节点信息

##### Returns
`Promise` - 通过`then`可以获取当前所有共识节点的信息列表  
    `minerAddress` - (string)节点出块账号
    `incomeAddress` - (string)节点收益账号
    `nodeID` - (string)节点ID，由节点签名区块时用的私钥得来。以`0x`开头，长度为130个字符
    `rank` - (number)出块节点所在的排名
    `votes` - (string)节点所得票数
    `host` - (string)节点域名或IP
    `port` - (number)端口号
    `depositAmount` - (string)质押金额
    `introduction` - (string)节点简介
    `p2pUri` - (string)LemoChain节点的连接地址。该地址可用于[连接节点](#submodule-net-connect)

##### Example
```js
lemo.getDeputyNodeList(true).then(function(nodeList) {
    console.log(nodeList.length) // 1
    console.log(JSON.stringify(nodeList[0]))
// "{"minerAddress":"Lemo83DZ5J99JSK5ZH89TCW7T6ZZCWJ8H7FDGA7W","incomeAddress":"Lemo83DZ5J99JSK5ZH89TCW7T6ZZCWJ8H7FDGA7W","nodeID":"0x0e7dcd418dbe7717eb0e83162f8810a3c7725e0d386b324dc5f3ef5a27a2a83e393a193f6ab53d3a51b490adeee362357676f50eed3d188824ef1fb3af02b2d0","rank":0,"votes":"50000","host":"127.0.0.1","port":8080,"depositAmount":"5000000000000000000000000","introduction":"ddf","p2pUri":"0e7dcd418dbe7717eb0e83162f8810a3c7725e0d386b324dc5f3ef5a27a2a83e393a193f6ab53d3a51b490adeee362357676f50eed3d188824ef1fb3af02b2d0@127.0.0.1:8080"}"
    lemo.net.connect(nodeList[0].p2pUri)
})
```

---

<a name="submodule-chain-getTermReward"></a>
#### lemo.getTermReward
```
lemo.getTermReward(height)
```
获取换届奖励信息

##### Parameters
1. `number` - 区块高度，将根据该高度找到这一届中发放奖励的区块

##### Returns
`object` - 换届奖励信息，包括：
    `term` - (number)届数，从0开始
    `value` - (string)发放奖励的总量，单位为`mo`
    `rewardHeight` - (number)发放奖励区块的高度

##### Example
```js
lemo.getTermReward(1001).then(function(result){
console.log(JSON.stringify(result)) // {"term":0,"value":"1000000000","rewardHeight":10001}
})
```

---

<a name="submodule-chain-getAllRewardValue"></a>
#### lemo.getAllRewardValue
```
lemo.getAllRewardValue()
```
获取当前链所有的矿工收益信息

##### Parameters
无

##### Returns
`object` - 矿工的奖励信息，包括：
    `term` - (number)届数，从0开始
    `value` - (string)该届设置的奖励金额
    `times` - (number)这届奖励金额的修改次数，修改次数为1或2

##### Example
```js
lemo.getAllRewardValue().then(function(result){
console.log(result) // { 0: { term: '1', value: '1000000001', times: '1' } }
})
```

---

<a name="submodule-chain-getDistributionVersion"></a>
#### lemo.getDistributionVersion
```
lemo.getDistributionVersion()
```
获取 LemoChain Distribution 的版本号

##### Parameters
无

##### Returns
`Promise` - 通过`then`可以获取到 LemoChain 节点版本号

##### Example
```js
lemo.getDistributionVersion().then(function(version) {
    console.log(version) // "0.10.0"
})
```

---

<a name="submodule-chain-watchBlock"></a>
#### lemo.watchBlock
```
lemo.watchBlock(withBody, callback)
```
监听新的区块。在调用时会直接返回当前最新的区块。之后会等到产生了新的稳定块再回调

##### Parameters
1. `boolean` - 是否获取交易列表等区块体内容。默认为`false`
2. `Function` - 每次回调会传入[区块对象](#data-structure-block)

##### Returns
`number` - subscribeId，可用于[取消监听](#submodule-chain-stopWatchBlock)

##### Example
```js
lemo.watchBlock(true, function(block) {
    const d = new Date(1000 * parseInt(block.header.timestamp, 10))
    console.log(d.toUTCString()) // "Thu, 30 Aug 2018 12:00:00 GMT"
})
```

---

<a name="submodule-chain-stopWatchBlock"></a>
#### lemo.stopWatchBlock
```
lemo.stopWatchBlock(subscribeId)
```
停止监听区块

##### Parameters
1. `number` - [watchBlock](#submodule-chain-watchBlock)返回的subscribeId

##### Returns
无

##### Example
```js
const subscribeId = lemo.watchBlock(false, function(newBlock) {
    console.log(newBlock)
})
lemo.stopWatchBlock(subscribeId)
```

---

### account 模块 API

<a name="submodule-account-newKeyPair"></a>
#### lemo.account.newKeyPair
```
lemo.account.newKeyPair()
```
创建新的账户地址和私钥

##### Parameters
无

##### Returns
`Promise` - 通过`then`可以获取到私钥，账号公钥和账号地址

##### Example
```js
const result = lemo.account.newKeyPair()
console.log(result.privateKey)  //"0xfdbd9978910ce9e1ed276a75132aacb0a12e6c517d9bd0311a736c57a228ee52"
console.log(result.address) // "Lemo83BYKZJ4RN4TKC9C78RFW7YHW6S87TPRSH34"
```

---

<a name="submodule-account-getBalance"></a>
#### lemo.account.getBalance
```
lemo.account.getBalance(address)
```
获取账户余额

##### Parameters
1. `string` - 账户地址

##### Returns
`Promise` - 通过`then`可以获取到余额的`BigNumber`对象

##### Example
```js
lemo.account.getBalance('Lemo83BYKZJ4RN4TKC9C78RFW7YHW6S87TPRSH34').then(function(balance) {
    console.log(balance.toString(10)) // "1600000000000000000000000000"
})
```

---

<a name="submodule-account-getAccount"></a>
#### lemo.account.getAccount
```
lemo.account.getAccount(address)
```
获取账户信息

##### Parameters
1. `string` - 账户地址

##### Returns
`Promise` - 通过`then`可以获取到[账户](#data-structure-account)信息

##### Example
```js
lemo.account.getAccount('Lemo83BYKZJ4RN4TKC9C78RFW7YHW6S87TPRSH34').then(function(account) {
    console.log(account.balance.toMoney()) // "1600000000 LEMO"
})
```

---

<a name="submodule-account-getCandidateInfo"></a>
#### lemo.account.getCandidateInfo
```
lemo.account.getCandidateInfo(address)
```
获取候选人信息

##### Parameters
1. `string` - 候选人账户地址

##### Returns
`Promise` - 通过`then`可以获取到候选人信息，即[账户](#data-structure-account)中的`candidate`字段

##### Example
```js
lemo.account.getCandidateInfo('Lemo83BYKZJ4RN4TKC9C78RFW7YHW6S87TPRSH34')
    .then(function(candidate) {
        console.log(candidate.votes); // "1599999000"
    })
```

---

<a name="submodule-account-getEquity"></a>
#### lemo.account.getEquity
```
lemo.account.getEquity(address, assetId)
```
获取指定账户持有的指定资产权益

##### Parameters
1. `string` - 账户地址
2. `string` - 资产id

##### Returns
`Promise` - 通过`then`可以获取到账户持有的该资产信息

##### Example
```js
lemo.account.getEquity('Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG', '0xdb1e51e71fde226556ce8eb0d16b616b3213fc5d8906926889745a6c9c66a315').then(function(result) {
     console.log(result.assetCode) // '0xd1e09b2a55e5b1a8f60b678eeb9ba7af1da67c6e5cfa41dd8bf14698ab76966b'
     console.log(result.assetId) // '0xdb1e51e71fde226556ce8eb0d16b616b3213fc5d8906926889745a6c9c66a315'
     console.log(result.equity) // '123456000000000000000'
})
```

---

<a name="submodule-account-getEquityList"></a>
#### lemo.account.getEquityList
```
lemo.account.getEquityList(address, index, limit)
```
获取指定账户持有的所有资产权益

##### Parameters
1. `string` - 账户地址
2. `number` - 账户信息的下标
3. `number` - 获取账户的数量

##### Returns
`Promise` - 通过`then`可以获取到账户持有所有资产的信息

##### Example
```js
lemo.account.getEquityList('Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG', 0, 10).then(function(result) {
     console.log(result.equities[0].assetId) // 0xdb1e51e71fde226556ce8eb0d16b616b3213fc5d8906926889745a6c9c66a315
})
```

---

<a name="submodule-account-getEquityListByAssetCode"></a>
#### lemo.account.getAssetInfo
```
lemo.account.getEquityListByAssetCode(address, assetCode, index, limit) 
```
根据资产Code获取指定账户持有的相关资产权益

##### Parameters
1. `string` - 账户地址
2. `number` - 账户信息的下标
3. `number` - 获取账户的数量

##### Returns
`Promise` - 通过`then`可以获取到账户持有所有资产的信息

##### Example
```js
lemo.account.getEquityList('Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG', '0x41968aa5e7b0a4c99fb5bf7d3e89a7a7ca1c11bd8ac96cb77b29c02a9168461c', 0, 10).then(function(result) {
     console.log(result.equities[0].assetId) // 0xdb1e51e71fde226556ce8eb0d16b616b3213fc5d8906926889745a6c9c66a315
})
```

---

<a name="submodule-account-getAssetInfo"></a>
#### lemo.account.getAssetInfo
```
lemo.account.getAssetInfo(assetCode) 
```
获取指定资产类型的发行信息

##### Parameters
1. `string` - 资产类型

##### Returns
`Promise` - 通过`then`可以获取到指定资产的发行信息

##### Example
```js
lemo.account.getAssetInfo('0xd0befd3850c574b7f6ad6f7943fe19b212affb90162978adc2193a035ced8884').then(function(result) {
    console.log(result.category) // "1"
    console.log(result.profile.suggestedGasLimit) //"60000"
})
```

---

<a name="submodule-account-getAssetToken"></a>
#### lemo.account.getAssetToken
```
lemo.account.getAssetToken(assetId) 
```
获取指定资产通证的发行数据

##### Parameters
1. `string` - 资产id

##### Returns
`Promise` - 通过`then`可以获取到指定资产通证的发行数据。其属性有  
    - id `string` 资产id
    - code `string` 资产code
    - owner `string` 资产拥有者地址 
    - metaData `string` 附加在通证中的额外信息

##### Example
```js
lemo.account.getAssetToken('0x34b04e018488f37f449193af2f24feb3b034c994cde95d30e3181403ac76528a').then(function(result) {
    console.log(result.metaData) // "This is user-defined data"
    console.log(result.owner) // "Lemo8498CBCJSY9G7JF4CGZDP64PRRNGP4HQ2QPF"
})
```

---

<a name="submodule-account-createTempAddress"></a>
#### lemo.account.createTempAddress
```
lemo.account.createTempAddress(from, userId)
```
创建临时账户

##### Parameters
1. `string` - 创建者地址
2. `string` - 自定义的用户ID，必须是一个10字节以内的十六进制字符串

##### Returns
`string` - 临时账户地址

##### Example
```js
const userId = '1110000000000000000'
const result = lemo.account.createTempAddress('Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D', userId)
console.log(result) // Lemo85SY56SGRTQQ63A2Y43KYA8C7QAZB37P3KY5
```

---

<a name="submodule-account-isTempAddress"></a>
#### lemo.account.isTempAddress
```
lemo.account.isTempAddress(address)
```
校验地址是否为临时账户

##### Parameters
1. `string` - 账户地址

##### Returns
`boolean` - 是否是临时账户

##### Example
```js
const result = lemo.account.isTempAddress('Lemo85SY56SGRTQQ63A2Y43KYA8C7QAZB37P3KY5')
console.log(result) // true
```

---

<a name="submodule-account-isContractAddress"></a>
#### lemo.account.isContractAddress
```
lemo.account.isContractAddress(address)
```
校验地址是否为合约账户

##### Parameters
1. `string` - 账户地址

##### Returns
`boolean` - 是否是合约账户

##### Example
```js
const result = lemo.account.isContractAddress('Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D')
console.log(result) // false
```

---

### tx 模块 API

<a name="submodule-tx-getTx"></a>
#### lemo.tx.getTx
```
lemo.tx.getTx(txHash)
```
根据交易hash获取交易

##### Parameters
1. `string` - 交易hash

##### Returns
`Promise` - 通过`then`可以获取到[交易](#data-structure-transaction)信息。这个对象中增加了以下属性：  
    - `blockHash` 交易所在区块的hash  
    - `blockHeight` 交易所在区块的高度  
    - `minedTime` 交易所在区块的出块时间  
    - `pHash` 如果这是一个箱子交易中的子交易，则该值代表父交易的hash。否则为`0x0000000000000000000000000000000000000000000000000000000000000000`  
    - `assetCode` 如果这是一个资产相关的交易，则该值为相关的资产assetCode。否则为`0x0000000000000000000000000000000000000000000000000000000000000000`  
    - `assetId` 如果这是一个资产相关的交易，则该值为相关的资产assetId。否则为`0x0000000000000000000000000000000000000000000000000000000000000000`  
    - `parsedData` 解析后的特殊交易data字段  
##### Example
```js
lemo.tx.getTx('0xdb1e51e71fde226556ce8eb0d16b616b3213fc5d8906926889745a6c9c66a315').then(function(tx) {
    console.log(tx.from) // "Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG"
    console.log(tx.to) // "Lemo83JW7TBPA7P2P6AR9ZC2WCQJYRNHZ4NJD4CY"
    console.log(tx.amount) // "100"
    console.log(tx.gasPrice) // "3000000000"
    console.log(tx.gasLimit) // 2000000
    console.log(tx.expirationTime) // 1541649535
    console.log(tx.message) // ''
    console.log(tx.blockHash) // '0x425f4ca99da879aa97bd6feaef0d491096ff3437934a139f423fecf06f9fd5ab'
    console.log(tx.blockHeight) // 100
    console.log(tx.minedTime) // 1541649535
    console.log(tx.pHash) // '0xf1f570231c4403f4b46998c6430fd2312de0d21f9c36343e95da94a8c48bc265'
    console.log(tx.assetCode) // '0x41968aa5e7b0a4c99fb5bf7d3e89a7a7ca1c11bd8ac96cb77b29c02a9168461c'
    console.log(tx.assetId) // '0x41968aa5e7b0a4c99fb5bf7d3e89a7a7ca1c11bd8ac96cb77b29c02a9168461c'
    console.log(tx.parsedData) // {"assetId": "0x41968aa5e7b0a4c99fb5bf7d3e89a7a7ca1c11bd8ac96cb77b29c02a9168461c", "transferAmount": "1000000000"}
})
```

---

<a name="submodule-tx-getTxListByAddress"></a>
#### lemo.tx.getTxListByAddress
```
lemo.tx.getTxListByAddress(address, index, limit)
```
根据账户地址分页拉取交易列表

##### Parameters
1. `string` - 账户地址
2. `number` - 要获取的第一条交易的序号
3. `number` - 获取交易的最大条数

##### Returns
`Promise` - 通过`then`可以获取到一个`{txList:Array, total:number}`对象。其中  
    - `txList` 交易的数组，其中元素的格式与[lemo.tx.getTx](#submodule-tx-getTx)的返回值相同  
    - `total` 该账户下的交易总数  

##### Example
```js
lemo.tx.getTxListByAddress('Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D', 0, 10).then(function(result) {
    console.log(result.total) // 1
    console.log(result.txList[0].minedTime) // 1541649535
    console.log(JSON.stringify(result.txList)) // [{"type":8,"version":1,"chainID":"1","from":"Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D","gasPayer":null,"to":"Lemo83W3DBN8QASNAR2D5386QSNGC8DAN8TSRK53","toName":"","gasPrice":"3000000000","gasLimit":2000000,"gasUsed":37480,"amount":"0","data":"0x7b2261737365744964223a22307830613930346366663464313630333937323430626531653264306335326332346334313565323630383332646537333562666564623162356636396335623636222c227472616e73666572416d6f756e74223a2231303030303030303030227d","expirationTime":1601899822,"message":"","sigs":["0xe3c84e1e1abdbb1c62f3e338badf2f4c58a3af3ebc9b4dd87c1e1ab0d3c9bcba404861e86c98c9fff926df76ccedfc7e3d84313ced7126a3872f7fb2fa0c7f3d00"],"hash":"0xf1f570231c4403f4b46998c6430fd2312de0d21f9c36343e95da94a8c48bc265","gasPayerSigs":[],"parsedData":{"assetId":"0x0a904cff4d160397240be1e2d0c52c24c415e260832de735bfedb1b5f69c5b66","transferAmount":"1000000000"},"minedTime":1601898052,"pHash":"0x0000000000000000000000000000000000000000000000000000000000000000","blockHeight":1579,"blockHash":"0x51cb2d05acc247db302d3e42535a4f59e7ecbf3999322a185b7bfdfd6aebab4d","assetId":"0x0a904cff4d160397240be1e2d0c52c24c415e260832de735bfedb1b5f69c5b66","assetCode":"0x0a904cff4d160397240be1e2d0c52c24c415e260832de735bfedb1b5f69c5b66"}]
})
```

---

<a name="submodule-tx-getTxListByType"></a>
#### lemo.tx.getTxListByType
```
lemo.tx.getTxListByType(address, txType, index, limit)
```
根据账户地址分页拉取交易列表

##### Parameters
1. `string` - 账户地址
2. `number` - 交易类型，其值为枚举`LemoClient.TxType`
3. `number` - 要获取的第一条交易的序号
4. `number` - 获取交易的最大条数

##### Returns
`Promise` - 通过`then`可以获取到一个`{txList:Array, total:number}`对象。其中  
    - `txList` 交易的数组，其中元素的格式与[lemo.tx.getTx](#submodule-tx-getTx)的返回值相同  
    - `total` 该账户下的交易总数  

##### Example
```js
lemo.tx.getTxListByType('Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D', lemo.TxType.TRANSFER_ASSET, 0, 10).then(function(result) {
    console.log(result.total) // 1
    console.log(result.txList[0].minedTime) // 1541649535
    console.log(JSON.stringify(result.txList)) // [{"type":8,"version":1,"chainID":"1","from":"Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D","gasPayer":null,"to":"Lemo83W3DBN8QASNAR2D5386QSNGC8DAN8TSRK53","toName":"","gasPrice":"3000000000","gasLimit":2000000,"gasUsed":37480,"amount":"0","data":"0x7b2261737365744964223a22307830613930346366663464313630333937323430626531653264306335326332346334313565323630383332646537333562666564623162356636396335623636222c227472616e73666572416d6f756e74223a2231303030303030303030227d","expirationTime":1601899822,"message":"","sigs":["0xe3c84e1e1abdbb1c62f3e338badf2f4c58a3af3ebc9b4dd87c1e1ab0d3c9bcba404861e86c98c9fff926df76ccedfc7e3d84313ced7126a3872f7fb2fa0c7f3d00"],"hash":"0xf1f570231c4403f4b46998c6430fd2312de0d21f9c36343e95da94a8c48bc265","gasPayerSigs":[],"parsedData":{"assetId":"0x0a904cff4d160397240be1e2d0c52c24c415e260832de735bfedb1b5f69c5b66","transferAmount":"1000000000"},"minedTime":1601898052,"pHash":"0x0000000000000000000000000000000000000000000000000000000000000000","blockHeight":1579,"blockHash":"0x51cb2d05acc247db302d3e42535a4f59e7ecbf3999322a185b7bfdfd6aebab4d","assetId":"0x0a904cff4d160397240be1e2d0c52c24c415e260832de735bfedb1b5f69c5b66","assetCode":"0x0a904cff4d160397240be1e2d0c52c24c415e260832de735bfedb1b5f69c5b66"}]
})
```

---

<a name="submodule-tx-getAssetTxList"></a>
#### lemo.tx.getAssetTxList
```
lemo.tx.getAssetTxList(address, assetCodeOrId, index, limit)
```
根据账户地址分页拉取交易列表

##### Parameters
1. `string` - 账户地址
2. `string` - 资产Code或资产Id
3. `number` - 要获取的第一条交易的序号
4. `number` - 获取交易的最大条数

##### Returns
`Promise` - 通过`then`可以获取到一个`{txList:Array, total:number}`对象。其中  
    - `txList` 交易的数组，其中元素的格式与[lemo.tx.getTx](#submodule-tx-getTx)的返回值相同  
    - `total` 该账户下的交易总数  

##### Example
```js
lemo.tx.getAssetTxList('Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D', '0x41968aa5e7b0a4c99fb5bf7d3e89a7a7ca1c11bd8ac96cb77b29c02a9168461c', 0, 10).then(function(result) {
    console.log(result.total) // 1
    console.log(result.txList[0].minedTime) // 1541649535
    console.log(JSON.stringify(result.txList)) // [{"type":8,"version":1,"chainID":"1","from":"Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D","gasPayer":null,"to":"Lemo83W3DBN8QASNAR2D5386QSNGC8DAN8TSRK53","toName":"","gasPrice":"3000000000","gasLimit":2000000,"gasUsed":37480,"amount":"0","data":"0x7b2261737365744964223a22307830613930346366663464313630333937323430626531653264306335326332346334313565323630383332646537333562666564623162356636396335623636222c227472616e73666572416d6f756e74223a2231303030303030303030227d","expirationTime":1601899822,"message":"","sigs":["0xe3c84e1e1abdbb1c62f3e338badf2f4c58a3af3ebc9b4dd87c1e1ab0d3c9bcba404861e86c98c9fff926df76ccedfc7e3d84313ced7126a3872f7fb2fa0c7f3d00"],"hash":"0xf1f570231c4403f4b46998c6430fd2312de0d21f9c36343e95da94a8c48bc265","gasPayerSigs":[],"parsedData":{"assetId":"0x0a904cff4d160397240be1e2d0c52c24c415e260832de735bfedb1b5f69c5b66","transferAmount":"1000000000"},"minedTime":1601898052,"pHash":"0x0000000000000000000000000000000000000000000000000000000000000000","blockHeight":1579,"blockHash":"0x51cb2d05acc247db302d3e42535a4f59e7ecbf3999322a185b7bfdfd6aebab4d","assetId":"0x41968aa5e7b0a4c99fb5bf7d3e89a7a7ca1c11bd8ac96cb77b29c02a9168461c","assetCode":"0x0a904cff4d160397240be1e2d0c52c24c415e260832de735bfedb1b5f69c5b66"}]
})
```

---

<a name="submodule-tx-send"></a>
#### lemo.tx.send
```
lemo.tx.send(txConfig, privateKey)
```
发送交易

##### Parameters
1. `LemoTx|object|string` - 签过名或未签名的[交易](#data-structure-transaction)信息，可以是[LemoTx](https://github.com/LemoFoundationLtd/lemo-tx)对象形式也可以是[`lemo.tx.sign`](#submodule-tx-sign)返回的字符串形式  
2. `string` - (可选) 交易发送者的账户私钥，若存在，则会为交易签名  

##### Returns
`Promise` - 通过`then`可以获取到交易 hash

##### Example
```js
const txConfig = {from: 'Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG', to: 'Lemo83BYKZJ4RN4TKC9C78RFW7YHW6S87TPRSH34', amount: 100}
lemo.tx.send(txConfig, '0xc21b6b2fbf230f665b936194d14da67187732bf9d28768aef1a3cbb26608f8aa').then(function(txHash) {
    console.log(txHash) // 0x03fea27a8d140574dc648e1cb1a198f5ade450a347095cff7f3d961a11dac505
})
```
```js
const tx = new LemoTx({chainID: 100, from: 'Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG', to: 'Lemo83BYKZJ4RN4TKC9C78RFW7YHW6S87TPRSH34', amount: 100})
tx.signWith('0xc21b6b2fbf230f665b936194d14da67187732bf9d28768aef1a3cbb26608f8aa')
lemo.tx.send(tx).then(function(txHash) {
    console.log(txHash) // 0x03fea27a8d140574dc648e1cb1a198f5ade450a347095cff7f3d961a11dac505
})
```

---

<a name="submodule-tx-waitConfirm"></a>

#### lemo.tx.waitConfirm

```
lemo.tx.waitConfirm(txHash)
```

等待交易上链

##### Parameters

1. `string` - 交易hash

##### Returns

`Promise` - 通过`then`可以获取到交易信息

##### Example

```js
lemo.tx.waitConfirm(0xe71cd6d98b1e48ddccf36ed655700478971a8514abf7c4d2173512201222c6c0).then(function(result) {
  console.log(JSON.stringify(result))
  // {"blockHash":"0x425f4ca99da879aa97bd6feaef0d491096ff3437934a139f423fecf06f9fd5ab","height":"100","time":"1541649535","tx":{"chainID":200,"version":"1","type":"0","to":"Lemo846Q4NQCKJ2YWY6GHTSQHC7K24JDC7CPCWYH","toName":"aa","gasPrice":"2","gasLimit":"100","amount":"1","data":"0x0c","expirationTime":"1544584596","message":"aaa","from":"Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D","sigs":["0x8c0499083cb3d27bead4f21994aeebf8e75fa11df6bfe01c71cad583fc9a3c70778a437607d072540719a866adb630001fabbfb6b032d1a8dfbffac7daed8f0201"]}}
})
```
---

<a name="submodule-tx-watchTx"></a>
#### lemo.tx.watchTx
```
lemo.tx.watchTx(filterTxConfig, callback)
```
监听过滤区块中的交易，返回一个带有此信息的一个数组对象，得到subscribeId

##### Parameters
1. `object` - 交易筛选条件，可输入多个属性
2. `function` - 每次回调会传入过滤出来的交易数组

##### Returns
`number` - subscribeId，可用于[取消监听](#submodule-tx-stopWatchTx)

##### Example
```js
lemo.tx.watchTx({to:'Lemo83JW7TBPA7P2P6AR9ZC2WCQJYRNHZ4NJD4CY'}, function(transactions) {
    console.log(transactions[0].version)
}); //"1"

lemo.tx.watchTx({to:'Lemo83JW7TBPA7P2P6AR9ZC2WCQJYRNHZ4NJD4CY', from:'Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D'}, function(transactions) {
    console.log(transactions[0].version)
}); //"1"
```

---

<a name="submodule-tx-stopWatchTx"></a>
#### lemo.tx.stopWatchTx
```
lemo.tx.stopWatchTx(subscribeId)
```
停止监听区块中的交易

##### Parameters
1. `number` - [watchTx](#submodule-tx-watchTx)返回的subscribeId

##### Returns
无

##### Example
```js
const subscribeId = lemo.tx.watchTx({to:'Lemo83JW7TBPA7P2P6AR9ZC2WCQJYRNHZ4NJD4CY'}, function(transactions) {
    console.log(transactions[0].version)
}); 
lemo.tx.stopWatchTx(subscribeId)
```

---

<a name="submodule-global-stopWatch"></a>
#### lemo.stopWatch
```
lemo.stopWatch()
```
停止所有轮询

##### Parameters
无

##### Returns
无

##### Example
```js
lemo.stopWatch()
```

---

<a name="submodule-global-isWatching"></a>
#### lemo.isWatching
```
lemo.isWatching()
```
是否正在轮询

##### Parameters
无

##### Returns
`boolean` - 是否正在轮询

##### Example
```js
console.log(lemo.isWatching() ? 'watching' : 'not watching')
```

---

### 其它 API

<a name="submodule-tool-SDK_VERSION"></a>

#### LemoClient.SDK_VERSION

```
LemoClient.SDK_VERSION
```

`string` - SDK 版本号字符串

##### Example

```js
console.log(LemoClient.SDK_VERSION) // "1.0.0"
```

---

<a name="submodule-tool-TxType"></a>

#### LemoClient.TxType

```
LemoClient.TxType
```

[交易类型](#data-transaction-type)枚举类型，其中的值都是`number`类型

##### Example

```js
console.log(LemoClient.TxType.VOTE) // 1
```

---

<a name="submodule-tool-ChangeLogType"></a>

#### LemoClient.ChangeLogType

```
LemoClient.ChangeLogType
```

[修改记录类型](#data-change-log-type)枚举类型，其中的值都是`number`类型

##### Example

```js
console.log(LemoClient.ChangeLogType.BalanceLog) // 1
```

---


## 开发

### 依赖

- Node.js
- yarn

```bash
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install yarn
```

### 编译

```bash
yarn build
```

### 测试

```bash
yarn test
```

## 开源协议

LGPL-3.0
