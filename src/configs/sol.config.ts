import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'

import { Env, env } from './env'

/**
 * Contructor
 */
type Conf = {
  rpc: string
  network: WalletAdapterNetwork
  atbashAddress: string
  taxman: string
  fee: number
}

const conf: Record<Env, Conf> = {
  /**
   * Development configurations
   */
  development: {
    rpc: 'https://api.devnet.solana.com',
    network: WalletAdapterNetwork.Devnet,
    atbashAddress: 'GYbSXb61iQo6iM8novgi32HGvmWxqF4CbVGeNzB8sw4i',
    taxman: '',
    fee: 10 ** 6, // lamports,
  },

  /**
   * Production configurations
   */
  production: {
    rpc: 'https://api.mainet-beta.solana.com',
    network: WalletAdapterNetwork.Mainnet,
    atbashAddress: '',
    taxman: '',
    fee: 10 ** 6, // lamports
  },
}

/**
 * Module exports
 */
export default conf[env]
