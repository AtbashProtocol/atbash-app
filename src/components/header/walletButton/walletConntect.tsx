'use client'
import IonIcon from '@sentre/antd-ionicon'
import { Button } from 'antd'

export type WalletConnectProps = {
  onClick: () => void
}

export default function WalletConnect({ onClick }: WalletConnectProps) {
  return (
    <Button
      type="primary"
      size="large"
      onClick={onClick}
      icon={<IonIcon name="wallet-outline" />}
    >
      Connect Wallet
    </Button>
  )
}
