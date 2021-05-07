import { pairAbi } from '../../abi/pair.abi.js' // pair-abi
import { poolAbi } from '../../abi/pool.abi.js' // pool-abi

import { hbtcAbi } from '../../abi/hbtc.abi.js' // pre-abi
import { htAbi } from '../../abi/ht.abi.js' // next-abi
import Contract from '../contract/index.js'
import API from '../contract/api.js'

// pre-next HBTC/HT
const trsAddr = `0x66a79d23e58475d2738179ca52cd0b41d73f0bea` // pre
const usdtAddr = `0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F` // next

const trsUsdtPairAddr = `0x5c2e8aca453904c6339cf33af6513da944d5241b` // pre-next-pair
const trsUsdtPoolAddr = `0xa6785e5255321295A90EE3a31A74c7cA1Ef99C80` // pre-next-pool


const usdtTokenAddr = usdtAddr
const huiwanTokenAddr = trsAddr
const huiwanUsdtMdexAddr = trsUsdtPairAddr
const huiwanUsdtLoopAddr = trsUsdtPoolAddr

// pre-next HBTC/HT
const huiwanTokenABI = hbtcAbi //pre-abi
const usdtTokenABI = htAbi //next-abi
const huiwanUsdtMdexABI = pairAbi
const huiwanUsdtLoopABI = poolAbi



const contract = new Contract({
    huiwanUsdtLoopAddr,
    huiwanTokenAddr,
    usdtTokenAddr,
    huiwanUsdtMdexAddr,
    huiwanUsdtLoopABI,
    huiwanTokenABI,
    usdtTokenABI,
    huiwanUsdtMdexABI
})


export default new API(contract)