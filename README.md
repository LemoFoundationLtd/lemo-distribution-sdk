![Logo of the project](./logo.png)

# Lemochain Distribution SDK

[![npm](https://img.shields.io/npm/v/lemo-client.svg?style=flat-square)](https://www.npmjs.com/package/lemo-client)
[![Build Status](https://img.shields.io/travis/lemo-client/lemo-client.svg?style=flat-square)](https://travis-ci.org/lemo-client/lemo-client)
[![code coverage](https://img.shields.io/coveralls/LemoFoundationLtd/lemo-client.svg?style=flat-square)](https://coveralls.io/githup/LemoFoundationLtd/lemo-client)
[![install size](https://packagephobia.now.sh/badge?p=lemo-client)](https://packagephobia.now.sh/result?p=lemo-client)
[![gitter chat](https://img.shields.io/gitter/room/LemoFoundationLtd/lemo-client.svg?style=flat-square)](https://gitter.im/LemoFoundationLtd/lemo-client)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![GitHub license](https://img.shields.io/badge/license-LGPL3.0-blue.svg?style=flat-square)](https://github.com/LemoFoundationLtd/lemo-client/blob/master/LICENSE)

通过 JSON RPC 协议访问 LemoChain 上的数据

> 需要先在本地通过`--rpc`参数启动一个[LemoChain 节点](https://github.com/LemoFoundationLtd/lemochain-go)，或远程连接到一个已存在的 LemoChain 节点，才能运行本项目

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

lemo.chain.getBlockByNumber(0).then(function(block) {
    console.log(block)
})
```

## LemoChain API

> 所有异步接口都返回 Promise 对象  
> 所有接口都可在 LemoChain 节点的控制台中使用，但通过远程连接（如 http、websocket）到节点时，只能使用部分接口

| API                                                                        | 功能                           | 异步 | 可远程使用 |
| -------------------------------------------------------------------------- | ------------------------------ | ----- | ---------- |
| [lemo.getBlock(heightOrHash, withBody)](#submodule-chain-getBlock)         | 根据高度或 hash 获取区块       | ✓    | ✓          |
| [lemo.getNewestBlock(withBody)](#submodule-chain-getNewestBlock)          | 获取最新的块                   | ✓    | ✓          |
| [lemo.getNewestUnstableBlock()](#submodule-chain-getNewestUnstableBlock)          | 获取最新的不稳定块               | ✓    | ✖          |
| [lemo.getNewestHeight()](#submodule-chain-getNewestHeight)         | 获取最新高度                   | ✓    | ✓          |
| [lemo.getNewestUnstableHeight()](#submodule-chain-getNewestUnstableHeight)         | 获取最新不稳定块高度                   | ✓    | ✖          |
| [lemo.getGenesis()](#submodule-chain-getGenesis)                           | 获取创世区块                   | ✓    | ✓          |
| [lemo.getChainID()](#submodule-chain-getChainID)                           | 获取当前链 ID                  | ✓    | ✓          |
| [lemo.getGasPriceAdvice()](#submodule-chain-getGasPriceAdvice)             | 获取建议 gas 价格              | ✓    | ✓          |
| [lemo.getCandidateList()](#submodule-chain-getCandidateList)               | 分页获取候选节点列表            | ✓    | ✓          |
| [lemo.getCandidateTop30()](#submodule-chain-getCandidateTop30)             | 获取排名前30的候选节点列表       | ✓    | ✓          |
| [lemo.getDeputyNodeList()](#submodule-chain-getDeputyNodeList)             | 获取当前所有共识节点的地址列表    | ✓    | ✓          |
| [lemo.watchBlock(withBody, callback)](#submodule-chain-watchBlock)         | 监听新的区块                   | ✖    | ✓          |
| [lemo.stopWatchBlock(subscribeId)](#submodule-chain-stopWatchBlock)            | 停止监听区块                   | ✖    | ✓          |
| [lemo.account.newKeyPair()](#submodule-account-newKeyPair)                 | 创新账户公私钥                 | ✓    | ✓          |
| [lemo.account.getBalance(addr)](#submodule-account-getBalance)             | 获取账户余额                   | ✓    | ✓          |
| [lemo.account.getAccount(addr)](#submodule-account-getAccount)             | 获取账户信息                   | ✓    | ✓          |
| [lemo.account.getCandidateInfo(addr)](#submodule-account-getCandidateInfo) | 获取候选人信息                 | ✓    | ✓          |
| [lemo.account.getAllAssets(address, index, limit)](#submodule-account-getAllAssets) | 获取指定账户持有的所有资产权益                 | ✓    | ✓          |
| [lemo.account.getAssetInfo(assetCode)](#submodule-account-getAssetInfo) | 获取指定资产类型的发行信息                 | ✓    | ✓          |
| [lemo.account.getAssetMetaData(assetId)](#submodule-account-getAssetMetaData) | 获取指定资产中保存的自定义数据                 | ✓    | ✓          |
| [lemo.tx.getTx(txHash)](#submodule-tx-getTx)                               | 根据交易hash获取交易            | ✓    | ✓          |
| [lemo.tx.getTxListByAddress(address, index, limit)](#submodule-tx-getTxListByAddress)     | 根据账户地址分页拉取交易列表      | ✓    | ✓          |
| [lemo.tx.sendTx(privateKey, txInfo)](#submodule-tx-sendTx)                 | 签名并发送交易                 | ✓    | ✓          |
| [lemo.tx.sign(privateKey, txInfo)](#submodule-tx-sign)                     | 签名交易                       | ✖    | ✓          |
| [lemo.tx.signVote(privateKey, txInfo)](#submodule-tx-signVote)             | 签名投票的特殊交易              | ✖    | ✓          |
| [lemo.tx.signCandidate(privateKey, txInfo, candidateInfo)](#submodule-tx-signCandidate)   | 签名注册/编辑候选节点的特殊交易   | ✖    | ✓          |
| [lemo.tx.signCreateAsset(privateKey, txConfig, createAssetInfo) ](#submodule-tx-signCreateAsset)   | 签名创建资产的交易   | ✖    | ✓          |
| [lemo.tx.signIssueAsset(privateKey, txConfig, issueAssetInfo)](#submodule-tx-signIssueAsset)   | 签名发行资产的交易   | ✖    | ✓          |
| [lemo.tx.signReplenishAsset(privateKey, txConfig, replenishInfo)](#submodule-tx-signReplenishAsset)   | 签名增发资产交易   | ✖    | ✓         |
| [lemo.tx.signModifyAsset(privateKey, txConfig, modifyInfo)](#submodule-tx-signModifyAsset)   | 签名修改资产交易   | ✖    | ✓         |
| [lemo.tx.signTransferAsset(privateKey, txConfig, transferAssetInfo)](#submodule-tx-signTransferAsset)   | 签名交易资产交易   | ✖    | ✓          |
| [lemo.tx.signNoGas(privateKey, txConfig, payer)](#submodule-tx-signNoGas)   | 签名免Gas费用交易   | ✖    | ✓         |
| [lemo.tx.signReimbursement(privateKey, noGasTxStr, gasPrice, gasLimit)](#submodule-tx-signReimbursement)   | 签名代付Gas交易   | ✖    | ✓         |
| [lemo.tx.send(signedTxInfo)](#submodule-tx-send)                           | 发送已签名的交易               | ✓    | ✓          |
| [lemo.tx.watchTx(filterTxConfig, callback)](#submodule-tx-watchTx)         | 监听过滤区块的交易            | ✖    | ✓          |
| [lemo.tx.stopWatchTx(subscribeId)](#submodule-tx-stopWatchTx)                | 停止指定交易            | ✖    | ✓          |
| [lemo.tx.watchPendingTx(callback)](#submodule-tx-watchPendingTx)           | 监听新的 pending 交易          | ✖    | ✖          |
| [lemo.stopWatch()](#submodule-global-stopWatch)                     | 停止所有轮询       | ✖    | ✓          |
| [lemo.isWatching()](#submodule-global-isWatching)                          | 是否正在轮询                   | ✖    | ✓          |
| [lemo.tool.verifyAddress(addr)](#submodule-tool-verifyAddress)             | LemoChain地址校验             | ✖    | ✓          |
| [lemo.tool.moToLemo(mo)](#submodule-tool-moToLemo)             | 将单位从mo转换为LEMO             | ✖    | ✓          |
| [lemo.tool.lemoToMo(ether)](#submodule-tool-lemoToMo)             | 将单位从LEMO转换为mo             | ✖    | ✓          |
| [lemo.tool.toBuffer(data)](#submodule-tool-toBuffer)             | 将数据转换为Buffer类型             | ✖    | ✓          |

| 常量                                                                        | 功能                           |
| -------------------------------------------------------------------------- | ------------------------------ |
| [lemo.SDK_VERSION](#submodule-global-SDK_VERSION)                          | js SDK 版本号                  |
| [lemo.TxType](#submodule-global-TxType)                                    | 交易类型枚举                  |

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

-   `jsonrpc` - (string) 固定为`2.0`
-   `method` - (string) API 模块名和方法名，以下划线连接
-   `params` - (Array) API 方法参数列表，直接以对象形式传递参数
-   `id` - (number) 递增的请求 id

#### 正常回包

```
{
    "jsonrpc": "2.0",
    "result": {...},
    "id": 1
}
```

-   `jsonrpc` - (string) 固定为`2.0`
-   `result` - (\*) 返回的数据，可以是任意类型
-   `id` - (number) 对应的请求 id

#### 异常回包

```
{
    "jsonrpc": "2.0",
    "error": {"code": -32601, "message": "Method not found"},
    "id": 1
}
```

-   `jsonrpc` - (string) 固定为`2.0`
-   `error` - (object) 异常信息，包含一个负数`code`和一个描述字符串`message`
-   `id` - (number) 对应的请求 id

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

-   `header` [区块头](#data-structure-header)
-   `transactions` 该块中打包的所有[交易](#data-structure-transaction)列表
-   `changeLogs` 该块对链上数据的[修改记录](#data-structure-changeLog)列表
-   `confirms` 各共识节点验证区块通过后，对该块 hash 的[签名](#data-structure-confirm)列表
-   `events` 该块中所有交易产生的[合约事件](#data-structure-event)列表
-   `deputyNodes` 如果该块是一个`快照块`，则这里保存新一代[共识节点信息](#data-structure-deputyNode)的列表。否则为空

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
    "extraData": "0x"
}
```

-   `hash` 区块 hash
-   `height` 区块高度
-   `parentHash` 上一个区块的 hash
-   `miner` 出块者的账户地址
-   `signData` 出块者对区块 hash 的签名
-   `timestamp` 出块时间戳，单位为秒
-   `gasLimit` 该块中打包的交易消耗的总 gas 上限
-   `gasUsed` 该块中打包的交易消耗的实际 gas
-   `eventBloom` 对区块中的`events`计算出的 Bloom 过滤器，用来快速查询合约事件
-   `changeLogRoot` 将区块中的`changeLogs`以 Merkle 树的形式组织起来，得到的根节点 hash
-   `deputyRoot` 将区块中的`deputyNodes`以 Merkle 树的形式组织起来，得到的根节点 hash
-   `eventRoot` 将区块中的`events`以 Merkle 树的形式组织起来，得到的根节点 hash
-   `transactionRoot` 将区块中的`transactions`以 Merkle 树的形式组织起来，得到的根节点 hash
-   `versionRoot` 该块打包时全局账户版本树的根节点 hash
-   `extraData` (可选) 出块者向区块中添加的自定义信息

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
    "toName": "",
    "amount": "100",
    "data": "0x",
    "expirationTime": 1541566996,
    "gasLimit": 2000000,
    "gasPrice": "3000000000",
    "hash": "0x6d3062a9f5d4400b2002b436bc69485449891c83e23bf9e27229234da5b25dcf",
    "message": "",
    "sig": "0xd9a9f9f41ea020185a6480fe6938d776f0a675d89057c071fc890e09742a4dd96edb9d48c9978c2f12fbde0d0445f2ff5f08a448b91469511c663567d0b015f601",
    "gasPayerSig": "0x800be6a0cf31ab9e86d547fb8cf964339276233a2b260ad8a4b4c93b39a48d6b1761e125f601bc6953e30eaad3e698c12add332a5740f1618915c12432dc610601"
}
```

-   `type` 交易类型
-   `chainID` LemoChain的ID
-   `version` 当前交易版本，介于0-128之间
-   `from` 交易发送者的账户地址。由签名字段解析得到
-   `to` 交易接收者的账户地址
-   `toName` (可选) 交易接收者的账户名，会与账户地址进行比对校验。类似银行转账时填写的姓名与卡号的关系。最大长度为100字符
-   `amount` 交易金额，`BigNumber`对象，单位`mo`。1`LEMO`=1000000000000000000`mo`=1e18`mo`
-   `data` (可选) 交易附带的数据，可用于调用智能合约。根据交易类型也会有不同的作用
-   `expirationTime` 交易过期时间戳，单位为秒。如果交易过期时间在半小时以后，则可能不会被打包，这取决于节点交易池的配置
-   `gasLimit` 交易消耗的 gas 上限。如果超过这个限制还没运行结束，则交易失败，并且 gas 费用不退还
-   `gasPrice` 交易消耗 gas 的单价，`BigNumber`对象，单位为`mo`。单价越高越优先被打包
-   `hash` 交易 hash
-   `message` (可选) 交易附带的文本消息。最大长度为1024字符
-   `sig` 交易签名字段，长度为65个字节
-   `gasPayerSig` 代付 gas 交易签名字段，长度为65个字节

<a name="data-transaction-type"></a>

| 交易类型                 | 数值 | 说明                       |
| ----------------------- | --- | -------------------------- |
| lemo.TxType.ORDINARY    | 0   | 普通转账交易或合约执行交易    |
| lemo.TxType.VOTE        | 1   | 设置投票对象                |
| lemo.TxType.CANDIDATE   | 2   | 注册或修改候选人信息         |
| lemo.TxType.CREATE_ASSET | 3   | 创建资产信息                |
| lemo.TxType.ISSUE_ASSET  | 4   | 发行资产                   |
| lemo.TxType.REPLENISH_ASSET   | 5   | 增发资产交易           |
| lemo.TxType.MODIFY_ASSET | 6   | 修改资产交易                |
| lemo.TxType.TRANSFER_ASSET| 7   | 交易资产                   |

| chainID | 说明           |
| ------- | -------------- |
| 1       | LemoChain 主网 |
| 100     | LemoChain 测试网 |

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

-   `category` 资产类型
-   `decimal` 发行资产的小数位，表示将总数细化到小数点后多少位，默认为18位
-   `totalSupply` 发行的资产总量，当资产在增发和销毁时发行的资产总量会实时变化，发行资产总量为`发行量*10^decimal`
-   `isReplenishable` 该资产是否可增发，在创建资产时设置，设置后不可再次修改，默认为`true`
-   `isDivisible` 该资产是否可分割，在创建资产时设置，设置后不可再次修改，默认为`true`
-   `issuer` 发行者地址，根据创建资产时的签名字段得到
-   `profile` 资产的其他信息，此部分内容可以再次修改
    -   `name` 创建该资产时的资产名称
    -   `symbol` 资产标识
    -   `description` 资产基本信息
    -   `suggestedGasLimit` 交易消耗的gas上限，和`gasLimit`相同用法，创建资产时由用户自己设置，默认为60000
    -   `freeze` 是否冻结资产，默认为`false`，将其设置为`true`可以停止该资产除查询以外的一切操作

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

-   `assetCode` 资产码，创建资产时得到
-   `assetId` 资产Id，发行资产时得到，如果资产类型为1，则 assetCode 和 assetId 相同
-   `balance` 资产余额，单位是`mo`

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

-   `address` 产生了数据变化的账号地址
-   `version` 账户数据的版本号，每种`type`的数据版本号彼此独立
-   根据`type`的不同，`newValue`和`extra`内保存的数据也不同

| type        | 功能                 | newValue  | extra |
| ----------- | -------------------- | --------- | ----- |
| BalanceLog  | 账户余额变化         | 新的余额  | -     |
| StorageLog  | 合约账户存储数据变化 | value     | key   |
| CodeLog     | 合约账户创建         | 合约 code | -     |
| AddEventLog | 产生一条合约日志     | 合约日志  | -     |
| SuicideLog  | 合约账户销毁         | -         | -     |
| VoteForLog | 修改投票对象账号地址 | 新的投票对象地址 | - |
| VotesLog | 候选者收到的票数变化 | 新的票数 | - |
| CandidateProfileLog | 候选者修改自己的节点信息 | 节点信息对象 | - |

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
    "nodeID": "5e3600755f9b512a65603b38e30885c98cbac70259c3235c9b3f42ee563b480edea351ba0ff5748a638fe0aeff5d845bf37a3b437831871b48fd32f33cd9a3c0",
    "host": "127.0.0.1",
    "port": "7001",
    "votes": "50000"
}
```

-   `minerAddress` 节点的挖矿收益账号地址
-   `nodeID` 节点的 ID，即节点对区块签名时的私钥对应的公钥。长度为128个字符，不要加`0x`
-   `host` 节点的 IP 地址或域名。最大长度为128字符
-   `port` 与其它节点连接用的端口号
-   `votes` 节点的总票数

<a name="data-structure-account"></a>

#### account

账户信息

```json
{
    "address": "Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG",
    "balance": "1599999999999999999999999900",
    "records": {
        "BalanceLog": {
            "version": 3,
            "height": 1
        }
    },
    "codeHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "root": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "txCount": 0,
    "voteFor": "Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG",
    "candidate": {
        "votes": "1599999000",
        "profile": {
            "host": "www.lemochain.com",
            "isCandidate": "true",
            "minerAddress": "Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG",
            "nodeID": "5e3600755f9b512a65603b38e30885c98cbac70259c3235c9b3f42ee563b480edea351ba0ff5748a638fe0aeff5d845bf37a3b437831871b48fd32f33cd9a3c0",
            "port": "7001"
        }
    }
}
```

-   `address` 账户地址
-   `balance` 账户余额，`BigNumber`对象，并且有`toMoney()`方法可以输出格式化金额
-   `records` 账户数据的修改记录对象。其中 key 是[ChangeLog](data-structure-changeLog)的类型，value 是该类型对应最新的那一条`ChangeLog`的版本号和所在的区块高度
-   `codeHash` 合约账户的代码 hash
-   `root` 合约账户的存储树根节点 hash
-   `txCount` 账户收到或发送的交易数量
-   `voteFor` 投票对象的账户地址
-   `candidate` 如果是候选者账户，则该字段不为空
    - `votes` 候选者收到的总票数
    - `profile` 候选者信息
        - `host` 候选者的节点服务器连接地址，可以是IP或域名
        - `isCandidate` 该账户是否是候选者。用来取消候选者身份
        - `minerAddress` 节点的挖矿收益账号地址
        - `nodeID` 节点的 ID，即节点对区块签名时的私钥对应的公钥。长度为128个字符，不要加`0x`
        - `port` 候选者的节点服务器端口号

---

### 构造函数

```
lemo = new LemoClient({
    chainID: 1, 
    host: 'http://127.0.0.1:8001'
})
```

-   `chainID` 区块链的 chainID，默认值为`1`，即 LemoChain 主链
-   `host` LemoChain 节点的 HTTP 连接地址。默认值`http://127.0.0.1:8001`
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

<a name="submodule-chain-getNewestUnstableBlock"></a>

#### lemo.getNewestUnstableBlock

```
lemo.getNewestUnstableBlock()
```

获取最新不稳定的块，可能没有足够的共识节点确认

##### Parameters

无

##### Returns

`Promise` - 通过`then`可以获取到[区块对象](#data-structure-block)，包括区块体

##### Example

```js
lemo.getNewestUnstableBlock().then(function(block) {
    console.log(block.header.miner) // "Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG"
})
```

---

<a name="submodule-chain-getNewestHeight"></a>

#### lemo.getNewestHeight

```
lemo.getNewestHeight([stable])
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

<a name="submodule-chain-getNewestUnstableHeight"></a>

#### lemo.getNewestUnstableHeight

```
lemo.getNewestUnstableHeight()
```

获取最新不稳定块高度

##### Parameters

无

##### Returns

`Promise` - 通过`then`可以获取到当前区块高度

##### Example

```js
lemo.getNewestUnstableHeight().then(function(height) {
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
lemo.getGenesis().then(function(height) {
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
    console.log(gasPrice) // "2000000000"
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
    console.log(JSON.stringify(result.candidateList)) // [{"address":"Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG","profile":{"host":"127.0.0.1","isCandidate":true,"minerAddress":"Lemobw","nodeID":"5e3600755f9b512a65603b38e30885c98cbac70259c3235c9b3f42ee563b480edea351ba0ff5748a638fe0aeff5d845bf37a3b437831871b48fd32f33cd9a3c0","port":7001},"votes":"1599999000"}]
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
    console.log(JSON.stringify(candidateList)) // [{"address":"Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG","profile":{"host":"127.0.0.1","isCandidate":true,"minerAddress":"Lemobw","nodeID":"5e3600755f9b512a65603b38e30885c98cbac70259c3235c9b3f42ee563b480edea351ba0ff5748a638fe0aeff5d845bf37a3b437831871b48fd32f33cd9a3c0","port":7001},"votes":"1599999000"}]
})
```

---

<a name="submodule-chain-getDeputyNodeList"></a>
#### lemo.getDeputyNodeList
```
lemo.getDeputyNodeList()
```
获取当前所有共识节点的地址列表

##### Parameters
无

##### Returns
`Promise` - 通过`then`可以获取当前所有共识节点的地址列表。该地址可用于[连接节点](#submodule-net-connect)  

##### Example
```js
lemo.getDeputyNodeList().then(function(nodeList) {
    console.log(nodeList.length) // 1
    console.log(nodeList[0]) // "5e3600755f9b512a65603b38e30885c98cbac70259c3235c9b3f42ee563b480edea351ba0ff5748a638fe0aeff5d845bf37a3b437831871b48fd32f33cd9a3c0@149.28.68.93:7003"
    lemo.net.connect(nodeList[0])
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

`number` - watchId，可用于[取消监听](#submodule-stopWatch)

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

1. `number` - 获取subscribeId，用于停止监听

##### Returns

无

##### Example

```js
const watchBlockId = lemo.watchBlock(false, function(newBlock) {
    console.log(newBlock)
})
lemo.stopWatchBlock(watchBlockId)
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
lemo.account.newKeyPair().then(function(accountKey) {
    console.log(accountKey.private) // "0xfdbd9978910ce9e1ed276a75132aacb0a12e6c517d9bd0311a736c57a228ee52"
    console.log(accountKey.public) // "0x0b3eebecd39c972767ad39e2df2db4c8af91b9f50a038e18f1e20335630d11624a794c5e0e4d6a0547f30bf21ca1d6cf87f6390676f42c2201b15fdc88d5f6f7"
    console.log(accountKey.address) // "Lemo83BYKZJ4RN4TKC9C78RFW7YHW6S87TPRSH34"
})
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

<a name="submodule-account-getAllAssets"></a>
#### lemo.account.getAllAssets
```
lemo.account.getAllAssets(address, index, limit)
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
lemo.account.getAllAssets('Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D', 0, 10).then(function(result) {
    console.log(result.equities[0].assetId) // 0x34b04e018488f37f449193af2f24feb3b034c994cde95d30e3181403ac76528a
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

<a name="submodule-account-getAssetMetaData"></a>
#### lemo.account.getAssetMetaData
```
lemo.account.getAssetMetaData(assetId) 
```
获取指定资产中保存的自定义数据

##### Parameters
1. `string` - 资产ID

##### Returns
`Promise` - 通过`then`可以获取到指定资产保存的自定义数据。这个对象中增加了以下属性：  
    - `string` 资产拥有者地址 

##### Example
```js
lemo.account.getAssetMetaData('0x34b04e018488f37f449193af2f24feb3b034c994cde95d30e3181403ac76528a').then(function(result) {
    console.log(result.metaDate) // "This is user-defined data"
    console.log(result.owner) // "Lemo8498CBCJSY9G7JF4CGZDP64PRRNGP4HQ2QPF"
})
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

##### Example

```js
lemo.tx.getTx('0x94ad0a9869cb6418f6a67df76d1293b557adb567ca3d29bfc8d8ff0d5f4ac2de').then(function(tx) {
    console.log(tx.from) // "Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG"
    console.log(tx.to) // "Lemo83JW7TBPA7P2P6AR9ZC2WCQJYRNHZ4NJD4CY"
    console.log(tx.amount) // "100"
    console.log(tx.gasPrice) // "3000000000"
    console.log(tx.gasLimit) // 2000000
    console.log(tx.expirationTime) // 1541649535
    console.log(tx.message) // ''
    console.log(tx.blockHeight) // 100
    console.log(tx.minedTime) // 1541649535
    console.log(tx.blockHash) // '0x425f4ca99da879aa97bd6feaef0d491096ff3437934a139f423fecf06f9fd5ab'
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
    - `txList` [交易](#data-structure-transaction)的数组，其中增加了`minedTime`属性，表示所在区块的出块时间  
    - `total` 该账户下的交易总数  

##### Example

```js
lemo.tx.getTxListByAddress('Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D', 0, 10).then(function(result) {
    console.log(result.total) // 1
    console.log(result.txList[0].minedTime) // 1541649535
    console.log(JSON.stringify(result.txList)) // [{"to":"Lemo83JW7TBPA7P2P6AR9ZC2WCQJYRNHZ4NJD4CY","toName":"","gasPrice":"3000000000","gasLimit":2000000,"amount":"1.0000000000000000000000001e+25","data":"0x","expirationTime":1541649535,"message":"","v":"0x020001","r":"0x1aebf7c6141dc54b3f181e56d287785f2ce501c70466016f96d8b7171d80555c","s":"0x584179c208ad9bc9488b969b9d06635dda05b932b1966d43b6255ca63288903c","from":"Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D","minedTime":1541649535}]
})
```

---

<a name="submodule-tx-sendTx"></a>

#### lemo.tx.sendTx

```
lemo.tx.sendTx(privateKey, txconfig, waitConfirm)
```

签名并发送交易

##### Parameters

1. `string` - 账户私钥
2. `object` - 签名前的交易信息
    - `type` - (number) (选填) 交易类型，默认值为`0`
    - `chainID` - (number) (选填) LemoChain 的ID，默认值为`1`
    - `version` - (number) (选填) 交易编码版本号，默认值为`0`
    - `to` - (string) (选填) 交易接收者的账户地址。为空表示这是创建智能合约的交易，必须携带`data`
    - `toName` - (string) (选填) 交易接收者的账户名，会与账户地址进行比对校验。类似银行转账时填写的姓名与卡号的关系
    - `amount` - (number|string) (选填) 交易金额，单位`mo`，默认值为`0`
    - `gasPrice` - (number|string) (选填) 交易消耗的 gas 上限，默认值为`3000000000`
    - `gasLimit` - (number|string) (选填) 交易消耗 gas 的单价，单位为`mo`，默认值为`2000000`
    - `data` - (Buffer|string) (选填) 交易附带的数据，可用于调用智能合约，默认为空
    - `expirationTime` - (number|string) (选填)交易过期时间戳，单位为秒，默认值为半小时后
    - `message` - (string) (选填)交易附带的文本消息，默认为空
3. `boolean` - (选填)等待[交易](#data-structure-transaction)共识，默认为`true`

##### Returns

`Promise` - 通过`then`可以获取到交易 hash

##### Example

```js
const txInfo = {to: 'Lemo83BYKZJ4RN4TKC9C78RFW7YHW6S87TPRSH34', amount: 100}
lemo.tx.sendTx('0xfdbd9978910ce9e1ed276a75132aacb0a12e6c517d9bd0311a736c57a228ee52', txInfo).then(function(txHash) {
    console.log(txHash)
})
```

---

<a name="submodule-tx-sign"></a>

#### lemo.tx.sign

```
lemo.tx.sign(privateKey, txInfo)
```

签名交易并返回签名后的交易信息字符串  
该方法用于实现安全的离线交易

1. 在离线电脑上签名
2. 将签名后的数据拷贝到联网电脑上
3. 通过[`lemo.tx.send`](#submodule-tx-send)方法发送到 LemoChain

##### Parameters

1. `string` - 账户私钥
2. `object` - 签名前的交易信息，细节参考[`lemo.tx.sendTx`](#submodule-tx-sendTx)

##### Returns

`string` - 签名后的[交易](#data-structure-transaction)信息字符串

##### Example

```js
const txInfo = {to: 'Lemo83BYKZJ4RN4TKC9C78RFW7YHW6S87TPRSH34', amount: 100}
const signedTxStr = lemo.tx.sign('0xfdbd9978910ce9e1ed276a75132aacb0a12e6c517d9bd0311a736c57a228ee52', txInfo)
console.log(signedTxStr)
// {"amount":"100","expirationTime":"1535632200","gasLimit":"2000000","gasPrice":"3000000000","r":"0xdefbd406e0aed8a01ac33877a0267ca720e8231b7660d790386ae45686cf8781","s":"0x3de9fea170ec8fba0cd2574878554558616733c45ea03975bb41104bab3bd312","to":"Lemo83BYKZJ4RN4TKC9C78RFW7YHW6S87TPRSH34","v":"0x030001"}
```

---

<a name="submodule-tx-signVote"></a>

#### lemo.tx.signVote

```
lemo.tx.signVote(privateKey, txInfo)
```

签名用于投票的特殊交易并返回签名后的交易信息字符串  
与[`lemo.tx.sign`](#submodule-tx-sign)用法相同，只是在交易中填充了特殊的数据  

##### Parameters

1. `string` - 账户私钥
2. `object` - 签名前的交易信息，细节参考[`lemo.tx.sendTx`](#submodule-tx-sendTx)。在投票特殊交易中的`to`表示投票对象的账户地址，`amount`、`data`字段会被忽略

##### Returns

`string` - 签名后的[交易](#data-structure-transaction)信息字符串

##### Example

```js
const txInfo = {to: 'Lemo83BYKZJ4RN4TKC9C78RFW7YHW6S87TPRSH34'}
const signedTxStr = lemo.tx.signVote('0xfdbd9978910ce9e1ed276a75132aacb0a12e6c517d9bd0311a736c57a228ee52', txInfo)
console.log(signedTxStr)
// {"type":"1","version":"1","chainID":"1","gasPrice":"3000000000","gasLimit":"2000000","amount":"0","expirationTime":"1557054086","to":"Lemo83BYKZJ4RN4TKC9C78RFW7YHW6S87TPRSH34","sig":"0x8eb17851931bcd0c6e2d53e6f01dcde5c124991f6f7c6d09db19cad83d24f6be668dad376dbdbc0793853565053a0ac12183ef6953ca7586cf07cede73f124d900"}
```

---

<a name="submodule-tx-signCandidate"></a>

#### lemo.tx.signCandidate

```
lemo.tx.signCandidate(privateKey, txInfo, candidateInfo)
```

签名用于注册或编辑候选人信息的特殊交易并返回签名后的交易信息字符串  
与[`lemo.tx.sign`](#submodule-tx-sign)用法相同，只是在交易中填充了特殊的数据  

##### Parameters

1. `string` - 账户私钥
2. `object` - 签名前的交易信息，细节参考[`lemo.tx.sendTx`](#submodule-tx-sendTx)。这里的`to`、`toName`、`amount`、`data`字段会被忽略
3. `object` - 候选人信息，即[账户](#data-structure-account)中的`candidate.profile`字段

##### Returns

`string` - 签名后的[交易](#data-structure-transaction)信息字符串

##### Example

```js
const txInfo = {chainID: '1'}
const candidateInfo = {
    isCandidate: true,
    minerAddress: 'Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG',
    nodeID: '5e3600755f9b512a65603b38e30885c98cbac70259c3235c9b3f42ee563b480edea351ba0ff5748a638fe0aeff5d845bf37a3b437831871b48fd32f33cd9a3c0',
    host: '127.0.0.1',
    port: '7001'
}
const signedTxStr = lemo.tx.signCandidate('0xfdbd9978910ce9e1ed276a75132aacb0a12e6c517d9bd0311a736c57a228ee52', txInfo, candidateInfo)
console.log(signedTxStr)
// {"type":"2","version":"1","chainID":"1","gasPrice":"3000000000","gasLimit":"2000000","amount":"0","expirationTime":"1557054141","data":"0x7b22697343616e646964617465223a2274727565222c226d696e657241646472657373223a224c656d6f3833474e3732475948324e5a3842413732395a39544354374b5135464333435236444a47222c226e6f64654944223a223565333630303735356639623531326136353630336233386533303838356339386362616337303235396333323335633962336634326565353633623438306564656133353162613066663537343861363338666530616566663564383435626633376133623433373833313837316234386664333266333363643961336330222c22686f7374223a223132372e302e302e31222c22706f7274223a2237303031227d","sig":"0xd81f37f282cac1aba65bd263bf1b2340da19e9e4a101f0aff2a414821185c340573e540fbb79e83cb24f92727789dbe781c018e040a58f0505109cd4949d13d501"}
```

---

<a name="submodule-tx-signCreateAsset"></a>

#### lemo.tx.signCreateAsset

```
lemo.tx.signCreateAsset(privateKey, txConfig, createAssetInfo)
```

签名用于创建资产的交易并返回签名后的交易信息字符串  
与[`lemo.tx.sign`](#submodule-tx-sign)用法相同，只是在交易中填充了特殊的数据    

##### Parameters

1. `string` - 账户私钥
2. `object` - 签名前的交易信息，细节参考[`lemo.tx.sendTx`](#submodule-tx-sendTx)。这里的 `to`, `amount`, `toName` 字段会被忽略
3. `object` - 创建[资产](#data-structure-asset)信息

##### Returns

`string` - 签名后的[交易](#data-structure-transaction)信息字符串，`data`里面包含创建资产的信息。

##### Example

```js
const txInfo = {chainID: '1'}
const createAssetInfo = {
    category: '1',
    decimal: 18,
    isReplenishable: true,
    isDivisible: true,
    profile: {
        name: 'Demo Asset',
        symbol: 'DT',
        description: 'demo asset',
        suggestedGasLimit: '60000',
    },
}
const signCreateAsset = lemo.tx.signCreateAsset('0x432a86ab8765d82415a803e29864dcfc1ed93dac949abf6f95a583179f27e4bb', txInfo, createAssetInfo)
console.log(signCreateAsset)
// {"type":"3","version":"1","chainID":"1","gasPrice":"3000000000","gasLimit":"2000000","amount":"0","expirationTime":"1557054204","data":"0x7b2263617465676f7279223a312c22646563696d616c73223a31382c2269735265706c656e69736861626c65223a747275652c226973446976697369626c65223a747275652c2270726f66696c65223a7b226e616d65223a2244656d6f204173736574222c2273796d626f6c223a224454222c226465736372697074696f6e223a2264656d6f206173736574222c227375676765737465644761734c696d6974223a223630303030222c2273746f70223a2266616c7365227d7d","sig":"0x067752b1f07813623e1d3b18042e2925a8745e1c585b2281ad1f4c00a9c72a7331ca4e7639533b7623cc417bef9acb3617c320a48d12c00423c191a17a77657300"}
```

---

<a name="submodule-tx-signIssueAsset"></a>

#### lemo.tx.signIssueAsset

```
lemo.tx.signIssueAsset(privateKey, txConfig, issueAssetInfo)
```

签名用于发行资产的交易并返回签名后的交易信息字符串  
与[`lemo.tx.sign`](#submodule-tx-sign)用法相同，只是在交易中填充了特殊的数据    

##### Parameters

1. `string` - 账户私钥
2. `object` - 签名前的交易信息，细节参考[`lemo.tx.sendTx`](#submodule-tx-sendTx)。这里的`amount`字段会被忽略
3. `object` - 发行资产信息，包括`assetCode`、`metaData`、`supplyAmount`字段

##### Returns

`string` - 签名后的[交易](#data-structure-transaction)信息字符串，`data`里面包含发行资产的信息。

##### Example

```js
const txInfo = {to: 'Lemo83BYKZJ4RN4TKC9C78RFW7YHW6S87TPRSH34'}
const issueAssetInfo = {
    assetCode: '0xd0befd3850c574b7f6ad6f7943fe19b212affb90162978adc2193a035ced8884',
    metaData: 'issue asset metaData',
    supplyAmount: '100000',
}
const signIssueAsset = lemo.tx.signIssueAsset('0x432a86ab8765d82415a803e29864dcfc1ed93dac949abf6f95a583179f27e4bb', txInfo, issueAssetInfo)
console.log(signIssueAsset)
// {"type":"4","version":"1","chainID":"1","gasPrice":"3000000000","gasLimit":"2000000","amount":"0","expirationTime":"1557054355","to":"Lemo83BYKZJ4RN4TKC9C78RFW7YHW6S87TPRSH34","data":"0x7b226173736574436f6465223a22307864306265666433383530633537346237663661643666373934336665313962323132616666623930313632393738616463323139336130333563656438383834222c226d65746144617461223a226973737565206173736574206d65746144617461222c22737570706c79416d6f756e74223a22313030303030227d","sig":"0xed8441c8d93fa8389ec7512ff24608199c1d6c9ffbf29d5293e25d1446956d75628f39e8492d7b8d33707ffa001a1caa2f34e3ebe46b27550daae6f4e474d72c00"}
```

---

<a name="submodule-tx-signReplenishAsset"></a>

#### lemo.tx.signReplenishAsset

```
lemo.tx.signReplenishAsset(privateKey, txConfig, replenishInfo)
```

签名用于增发资产的交易并返回签名后的交易信息字符串  
与[`lemo.tx.sign`](#submodule-tx-sign)用法相同，只是在交易中填充了特殊的数据    

##### Parameters

1. `string` - 账户私钥
2. `object` - 签名前的交易信息，细节参考[`lemo.tx.sendTx`](#submodule-tx-sendTx)，这里的`amount`字段会被忽略
3. `object` - 增发资产信息，包含`assetID`、`replenishAmount`字段

##### Returns

`string` - 签名后的[交易](#data-structure-transaction)信息字符串，`data`里面包含增发资产的信息。

##### Example

```js
const txInfo = {to: 'Lemo83JW7TBPA7P2P6AR9ZC2WCQJYRNHZ4NJD4CY'}
const replenishAssetInfo = {
    assetCode: '0xd0befd3850c574b7f6ad6f7943fe19b212affb90162978adc2193a035ced8884',
    assetId: '0xd0befd3850c574b7f6ad6f7943fe19b212affb90162978adc2193a035ced8884',
    replenishAmount: '100000',
}
const signReplenishAsset = lemo.tx.signReplenishAsset('0x432a86ab8765d82415a803e29864dcfc1ed93dac949abf6f95a583179f27e4bb', txInfo, replenishAssetInfo)
console.log(signReplenishAsset)
// {"type":"5","version":"1","chainID":"1","gasPrice":"3000000000","gasLimit":"2000000","amount":"0","expirationTime":"1557054506","to":"Lemo83JW7TBPA7P2P6AR9ZC2WCQJYRNHZ4NJD4CY","data":"0x7b226173736574436f6465223a22307864306265666433383530633537346237663661643666373934336665313962323132616666623930313632393738616463323139336130333563656438383834222c2261737365744964223a22307864306265666433383530633537346237663661643666373934336665313962323132616666623930313632393738616463323139336130333563656438383834222c227265706c656e697368416d6f756e74223a22313030303030227d","sig":"0x057955895c00aeef80d56effc0cb981628a0bfff303d3d76af4d7532560615f04230cf6a5f849de5b818fe13ce1b4819a0284865be4d477bb12de0536a940de500"}
```

---

<a name="submodule-tx-signModifyAsset"></a>

#### lemo.tx.signModifyAsset

```
lemo.tx.signModifyAsset(privateKey, txConfig, modifyInfo)
```

签名用于修改资产信息的交易并返回签名后的交易信息字符串  
与[`lemo.tx.sign`](#submodule-tx-sign)用法相同，只是在交易中填充了特殊的数据    

##### Parameters

1. `string` - 账户私钥
2. `object` - 签名前的交易信息，细节参考[`lemo.tx.sendTx`](#submodule-tx-sendTx)，这里的`amount`、`to`、`toName`字段会被忽略
3. `object` - 修改资产的信息，包含`assetCode`和`info`字段，`info`对象中包含需要修改的内容，如`name`、`symbol`、`description`、`freeze`、`suggestedGasLimit`等

##### Returns

`string` - 签名后的[交易](#data-structure-transaction)信息字符串，`data`里面包含修改资产的信息。

##### Example

```js
const txInfo = {chainID: '1'}
const ModifyAssetInfo = {
    assetCode: '0xd0befd3850c574b7f6ad6f7943fe19b212affb90162978adc2193a035ced8884',
    info: {
        name: 'Demo Asset',
        symbol: 'DT',
        description: 'demo asset',
    },
}
const signModifyAsset = lemo.tx.signModifyAsset('0x432a86ab8765d82415a803e29864dcfc1ed93dac949abf6f95a583179f27e4bb', txInfo, ModifyAssetInfo)
console.log(signModifyAsset)
// {"type":"6","version":"1","chainID":"1","gasPrice":"3000000000","gasLimit":"2000000","amount":"0","expirationTime":"1557054562","data":"0x7b226173736574436f6465223a22307864306265666433383530633537346237663661643666373934336665313962323132616666623930313632393738616463323139336130333563656438383834222c22696e666f223a7b226e616d65223a2244656d6f204173736574222c2273796d626f6c223a224454222c226465736372697074696f6e223a2264656d6f206173736574227d7d","sig":"0x989529bed1afbd162cde2097dbaa33c9f8b15e3bec5d187a58a7f8aa7d941ccb1bc0402278d52a47790262683c3ad77ed9face932f9403f0431117cff7ff962000"}
```

---

<a name="submodule-tx-signTransferAsset"></a>

#### lemo.tx.signTransferAsset

```
lemo.tx.signTransferAsset(privateKey, txConfig, transferAssetInfo)
```

签名用于交易资产的交易并返回签名后的交易信息字符串  
与[`lemo.tx.sign`](#submodule-tx-sign)用法相同，只是在交易中填充了特殊的数据    

##### Parameters

1. `string` - 账户私钥
2. `object` - 签名前的交易信息，细节参考[`lemo.tx.sendTx`](#submodule-tx-sendTx)。
3. `object` - 交易资产信息，包含`assetID`字段

##### Returns

`string` - 签名后的[交易](#data-structure-transaction)信息字符串，`data`里面包含交易资产的信息。

##### Example

```js
const txInfo = {to: 'Lemo83BYKZJ4RN4TKC9C78RFW7YHW6S87TPRSH34'}
const transferAsset = {
    assetId: '0xd0befd3850c574b7f6ad6f7943fe19b212affb90162978adc2193a035ced8884',
    transferAmount: '110000',
}
const signTransferAsset = lemo.tx.signTransferAsset('0x432a86ab8765d82415a803e29864dcfc1ed93dac949abf6f95a583179f27e4bb', txInfo, transferAsset)
console.log(signTransferAsset)
// {"type":"7","version":"1","chainID":"1","gasPrice":"3000000000","gasLimit":"2000000","amount":"0","expirationTime":"1557054587","to":"Lemo83BYKZJ4RN4TKC9C78RFW7YHW6S87TPRSH34","data":"0x7b2261737365744964223a22307864306265666433383530633537346237663661643666373934336665313962323132616666623930313632393738616463323139336130333563656438383834222c227472616e73666572416d6f756e74223a22313130303030227d","sig":"0x4d01229abf436c1d96ab6414b7da1b448035bcb1e0ed936974f94683fc253d973f34a4bce64e8b30178c3e735550e0c75bc6abc9fdcf85ff142d9fadeff1c78c00"}
```

---

<a name="submodule-tx-signNoGas"></a>

#### lemo.tx.signNoGas

```
lemo.tx.signNoGas(privateKey, txConfig, payer)
```

签名用于免Gas费用的交易并返回签名后的交易信息字符串  

1. 对包含`payer`账户地址的交易信息进行签名，该交易信息中不含`gasLimit`和`gasPrice`字段
2. 把返回的字符串交给代付gas的人
3. 代付gas的人填上`gasLimit`和`gasPrice`字段，然后用自己的私钥对其进行签名，返回最终的交易信息字符串
3. 通过[`lemo.tx.send`](#submodule-tx-send)方法把交易信息字符串发送到 LemoChain

##### Parameters

1. `string` - 账户私钥
2. `object` - 签名前的交易信息，细节参考[`lemo.tx.sendTx`](#submodule-tx-sendTx)，这里的`gasLimit`、`gasPrice`字段会被忽略
3. `string` - Gas代付账户的地址

##### Returns

`string` - 用于代付交易的字符串 [`lemo.tx.signReimbursement`](#submodule-tx-signReimbursement)

##### Example

```js
const txInfo = {to: 'Lemo83JW7TBPA7P2P6AR9ZC2WCQJYRNHZ4NJD4CY'}
const payer = 'Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D'
const noGasInfo = lemo.tx.signNoGas('0x432a86ab8765d82415a803e29864dcfc1ed93dac949abf6f95a583179f27e4bb', txInfo, payer)
console.log(noGasInfo)
// {"type":0,"version":"1","chainID":"1","to":"Lemo83JW7TBPA7P2P6AR9ZC2WCQJYRNHZ4NJD4CY","toName":"","gasPrice":3000000000,"gasLimit":2000000,"amount":"0","data":"","expirationTime":1557054625,"message":"","sig":"0xbb713b4e6a955e3bf5934dc7e7b02e0cf04936b1f7603cc646c380a0c6d5217f0923cff69b1d388da52983167072114898cbeb055cf6296ca1292b610fc91fdb01","gasPayerSig":"","from":"Lemo83AHRG46C3JP3D4QQP897ACCJD4G8BT5ZS67","payer":"Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D"}
```

---

<a name="submodule-tx-signReimbursement"></a>

#### lemo.tx.signReimbursement

```
lemo.tx.signReimbursement(privateKey, noGasTxStr, gasPrice, gasLimit)
```

对免 gas 费用交易信息进行签名，为其代付 gas，并返回签名后的交易信息字符串  
使用方式请参考 [`lemo.tx.signNoGas`](#submodule-tx-signNoGas) 

##### Parameters

1. `string` - 账户私钥
2. `string` - signNoGas 方法返回的字符串，里面带有`payer`字段，细节参考[`lemo.tx.sendTx`](#submodule-tx-sendTx)
3. `string` - 交易消耗 gas 的单价
3. `string` - 交易消耗的总 gas 上限

##### Returns

`string` - 签名后的[交易](#data-structure-transaction)信息字符串

##### Example

```js
const txInfo = {to: 'Lemo83JW7TBPA7P2P6AR9ZC2WCQJYRNHZ4NJD4CY'}
const payer = 'Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D'
const noGasInfo = lemo.tx.signNoGas('0x432a86ab8765d82415a803e29864dcfc1ed93dac949abf6f95a583179f27e4bb', txInfo, payer)
const result = lemo.tx.signReimbursement('0x432a86ab8765d82415a803e29864dcfc1ed93dac949abf6f95a583179f27e4bb', noGasInfo, 2, 100)
console.log(result)
// {"type":"0","version":"1","chainID":"1","gasPrice":"2","gasLimit":"100","amount":"0","expirationTime":"1557054706","to":"Lemo83JW7TBPA7P2P6AR9ZC2WCQJYRNHZ4NJD4CY","sig":"0x5b13c147a7e700dbe24d76f245daaf0ebcd35d9ecf17e436a0ceb691b26d79c46cc4f0fc3bb88b20f3c179bb61adfa008bfc31fe0648aa299052375a61317da700","gasPayerSig":"0x0edb211e684bfda13969aa9115c292a485bdb43061b54148b140b97cd0322b3d7d973004d8caf0c4de3975d0d553baa6d0d7d41a6ce0d14c0b754cecb4b020a900"}
```

---

<a name="submodule-tx-send"></a>

#### lemo.tx.send

```
lemo.tx.send(txConfig, waitConfirm)
```

发送已签名的交易

##### Parameters

1. `object|string` - 签名后的[交易](#data-structure-transaction)信息，可以是对象形式也可以是[`lemo.tx.sign`](#submodule-tx-sign)返回的字符串形式  
   相对于[`lemo.tx.sendTx`](#submodule-tx-sendTx)中的交易信息少了`type`、`version`字段，并多出了以下字段
    - `sig` - (string) 交易签名字段
    - `gasPayerSig` - (string) 代付gas交易签名字段
2. `boolean` - (选填)等待[交易](#data-structure-transaction)共识，默认为`true`

##### Returns

`Promise` - 通过`then`可以获取到交易 hash

##### Example

```js
const txInfo = {to: 'Lemo83BYKZJ4RN4TKC9C78RFW7YHW6S87TPRSH34', amount: 100}
lemo.tx
    .sign('0xfdbd9978910ce9e1ed276a75132aacb0a12e6c517d9bd0311a736c57a228ee52', txInfo)
    .then(function(signedTx) {
        return lemo.tx.send(signedTx)
    })
    .then(function(txHash) {
        console.log(txHash) // "0xe116a56b301f3bede1ad10c1496d57d6cb89454b4d6efbc20ca39132a4bc2b96"
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
`number` - 返回subscribeId的值,可用于取消监听

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
停止监听过滤区块中的交易

##### Parameters
1. `number` - 得到subscribeId，用于取消监听

##### Returns
无

##### Example
```js
const watchTxId = lemo.tx.watchTx({to:'Lemo83JW7TBPA7P2P6AR9ZC2WCQJYRNHZ4NJD4CY'}, function(transaction) {
    console.log(transaction[0].version)
}); 
lemo.tx.stopWatchTx(watchTxId)
```

---

<a name="submodule-tx-watchPendingTx"></a>

#### lemo.tx.watchPendingTx

```
lemo.tx.watchPendingTx(callback)
```

监听新的交易。在调用时会直接返回当前待打包的交易。之后会等到节点接收到新的交易再回调（1.0.0 版未实现）

##### Parameters

1. `Function` - 每次回调会传入[交易对象](#data-structure-transaction)列表

##### Returns

`number` - watchId，可用于[取消监听](#submodule-stopWatch)

##### Example

```js
lemo.watchPendingTx(true, function(transactions) {
    console.log(transactions.length)
})
```

---

### 其它 API

<a name="submodule-global-SDK_VERSION"></a>

#### lemo.SDK_VERSION

```
lemo.SDK_VERSION
```

`string` - SDK 版本号字符串

##### Example

```js
console.log(lemo.SDK_VERSION) // "1.0.0"
```

---

<a name="submodule-global-TxType"></a>

#### lemo.TxType

```
lemo.TxType
```

[交易类型](#data-transaction-type)枚举类型，其中的值都是`number`类型

##### Example

```js
console.log(lemo.TxType.VOTE) // 1
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

<a name="submodule-tool-verifyAddress"></a>
#### lemo.tool.verifyAddress
```
lemo.tool.verifyAddress(addr)
```
校验LemoChain地址

##### Parameters
1. `string` - LemoChain地址

##### Returns
`string` - 错误字符串。如果是合法的地址，则返回空字符串

##### Example
```js
const errMsg = lemo.tool.verifyAddress('LEMObw')
if (errMsg) {
    console.error(errMsg);
}
```

---

<a name="submodule-tool-moToLemo"></a>
#### lemo.tool.moToLemo
```
lemo.tool.moToLemo(mo)
```
将单位从mo转换为LEMO

##### Parameters
1. `string|number` - mo

##### Returns
`string` - 返回一个bigNumber类型的对象，如果输入的字符串或数字不合法，则会抛出一个异常

##### Example
```js
const result = lemo.tool.moToLemo('0.1')
console.log(result.toString(10)) // '0.0000000000000000001'
```

---

<a name="submodule-tool-lemoToMo"></a>
#### lemo.tool.lemoToMo
```
lemo.tool.lemoToMo(ether)
```
将单位从LEMO转换为mo

##### Parameters
1. `string|number` - LEMO

##### Returns
`string` - 返回一个bigNumber类型的对象，如果输入的字符串或数字不合法，则会抛出一个异常

##### Example
```js
const result = lemo.tool.lemoToMo('0.1')
console.log(result.toString(10)) // '100000000000000000'
```

---

<a name="submodule-tool-toBuffer"></a>
#### lemo.tool.toBuffer
```
lemo.tool.toBuffer(data)
```
将数据转换为Buffer类型

##### Parameters
1. `number|string|BigNumber|Buffer|null` - 要转换的数据

##### Returns
`Buffer` - 返回一个Buffer类型的对象，如果传入了不支持的类型，则会抛出一个异常

##### Example
```js
const result = lemo.tool.toBuffer('{"value": 100}')
console.log(result.toString('hex')) // '100000000000000000'
```

---

## 开发

### 依赖

-   Node.js
-   yarn

```bash
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install yarn
```

### 编译

```bash
yarn build
```

### 配置项

在 [lib/config.js](https://github.com/LemoFoundationLtd/lemo-client/blob/master/lib/config.js) 文件中有一些配置项，如果搭建 LemoChain 私链的话可以用到

### 测试

```bash
yarn test
```

## 开源协议

LGPL-3.0
