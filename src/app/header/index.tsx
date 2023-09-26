'use client'

import Island from '@/components/island'
import WalletButton from './walletButton'
import { Spin } from 'antd'

export default function Header() {
  return (
    <Island Loading={Spin}>
      <WalletButton />
    </Island>
  )
}
