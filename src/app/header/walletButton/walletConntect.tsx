'use client'
import IonIcon from '@sentre/antd-ionicon'

export type WalletConnectProps = {
  onClick: () => void
}

export default function WalletConnect({ onClick }: WalletConnectProps) {
  return (
    <div className="menu-item gap-2" onClick={onClick}>
      <IonIcon name="wallet-outline" />
      <p className="menu-option font-semibold">Connect Wallet</p>
    </div>
  )
}
