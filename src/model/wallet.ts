import { Buffer } from 'buffer'
import { Key } from 'smartxjs'
import { decrypt, encrypt, randomIv, randomSalt } from '../lib/aes'
import { Password } from '../lib/password'
import { hexBytes } from '../lib/utils'

export type WalletState = { wallet: Wallet, password: Password } | undefined

export interface Wallet {
  version: number
  network: string
  cipher: { salt: string, iv: string }
  accounts: Account[]
}

export interface Account {
  address: string
  encrypted: string
}

export interface WalletActions {
  load: () => void
}

export class GlobalLoadedWallet{

    static instance: GlobalLoadedWallet;

    static getInstance():GlobalLoadedWallet{
        if (!GlobalLoadedWallet.instance) {
            GlobalLoadedWallet.instance = new GlobalLoadedWallet()
        }
        return GlobalLoadedWallet.instance
    }

    public static setWalletState(walletstate:WalletState){
        GlobalLoadedWallet._walletstate = walletstate;
    }

    public static getWalletState():WalletState{
        return GlobalLoadedWallet._walletstate;
    }
    // @ts-ignore
    private static _walletstate:WalletState;
}

/**
 * 验证钱包是否合法
 * */
export function validateWallet(file: string, network: string): Wallet {

  throwIf(!file, 'Wallet file not loaded.')
  const fileFormat = (supp: string) => `Invalid wallet file format: ${supp}.`
  let wallet: Wallet
  try {
    wallet = JSON.parse(file)
  } catch (err) {
    throw new Error(fileFormat(err.message))
  }
  throwIf(wallet.version !== 1, 'Unrecognized wallet file version.')
  throwIf(wallet.network !== network,
    `Wallet is for ${wallet.network}, this is ${network}.`,
  )
  throwIf(!wallet.cipher, fileFormat('missing "cipher"'))
  throwIf(typeof wallet.cipher.iv !== 'string', fileFormat('missing "cipher.iv"'))
  throwIf(typeof wallet.cipher.salt !== 'string', fileFormat('missing "cipher.salt"'))
  throwIf(!(wallet.accounts instanceof Array), fileFormat('"accounts"'))
  throwIf(wallet.accounts.length < 1, fileFormat('empty accounts'))
  throwIf(typeof wallet.accounts[0].address !== 'string', ('"accounts.address"'))
  throwIf(typeof wallet.accounts[0].encrypted !== 'string', fileFormat('"account.encrypted"'))
  return wallet
}

/**
 * 验证钱包密码是否合法
 * */
export function validatePassword(wallet: Wallet, password: Password): WalletState {
  const state = { wallet, password }
  for (let i = 0; i < wallet.accounts.length; ++i) {
    const account = wallet.accounts[i]
    const key = getKey(state, i)
    throwIf(
      account.address.replace('0x', '') !== key.toAddressHexString().replace('0x', ''),
      'Invalid password.')
  }
  return state
}

function throwIf(cond: boolean, msg: string) {
  if (cond) {
    throw new Error(msg)
  }
}

/**
 * 从Hex编码的字符串当中获取钱包密钥
 * */
function semuxKeyFromHex(privKeyHex: string): Key {
  const privKey = new Uint8Array(Buffer.from(privKeyHex.replace('0x', ''), 'hex'))
  return Key.importEncodedPrivateKey(privKey)
}

/**
 * 生成新钱包
 * */
export function createNewWallet(password: Password, network: string, privKeysHex: string[]): Wallet {
  const salt = randomSalt()
  const iv = randomIv()
  const privKeys = privKeysHex.length > 0
    ? privKeysHex.map(semuxKeyFromHex)
    : [ Key.generateKeyPair() ]

  const newWallet: Wallet = {
    version: 1,
    network,
    cipher: { salt, iv },
    accounts: privKeys.map((key) => {
      const { encryptedPrivKey } = encrypt({ salt, iv, password, key })
      return {
        address: `0x${key.toAddressHexString()}`,
        encrypted: encryptedPrivKey,
      }
    }),
  }
  return newWallet
}

/**
 * 获取钱包当中的所有account
 * */
export function accounts(s: WalletState): Account[] {
  return s ? s.wallet.accounts : []
}

/**
 * 获取钱包当中所有账户的地址
 * */
export function addresses(s: WalletState): string[] {
  return accounts(s).map((account) => account.address)
}

/**
 * 获取钱包当中所有地址当中的第一个地址
 * */
export function address1st(s: WalletState): string {
  return addresses(s)[0] || ''
}

/**
 * 获取钱包当中第accountIdx的账户的私钥
 * */
export function getKey(state: WalletState, accountIdx: number): Key {
  if (!state) {
    throw new Error('no wallet')
  }
  const { wallet, password } = state
  const privKey = decrypt({
    salt: wallet.cipher.salt,
    iv: wallet.cipher.iv,
    password: state.password,
    encryptedPrivKey: wallet.accounts[accountIdx].encrypted,
  })
  const privKeyBytes = hexBytes(privKey)
  try {
    return Key.importEncodedPrivateKey(privKeyBytes)
  } catch (err) {
    throw new Error('Invalid password.')
  }
}

/**
 * 生成下载钱包的链接
 * */
export function walletHref(wallet: Wallet) {
  const data = JSON.stringify(wallet, null, 2)
  const blob = new Blob([data], { type: 'application/json' })
  return URL.createObjectURL(blob)
}
