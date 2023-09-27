'use client'
import { useCallback, useMemo, useState } from 'react'
import { Wallet } from '@solana/wallet-adapter-react'
import copy from 'copy-to-clipboard'

import { WalletIcon } from '@solana/wallet-adapter-react-ui'

import { asyncWait, shortenAddress } from '@/helpers/utils'

import { Button, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

export type WalletInfoProps = {
  wallet: Wallet
  onDisconnect?: () => void
}

export default function WalletInfo({
  wallet,
  onDisconnect = () => {},
}: WalletInfoProps) {
  const [copied, setCopied] = useState(false)

  const address = useMemo(
    () => wallet.adapter.publicKey?.toBase58() || '',
    [wallet.adapter.publicKey],
  )

  const onCopy = useCallback(async () => {
    copy(address)
    setCopied(true)
    await asyncWait(1500)
    return setCopied(false)
  }, [address])

  return (
    <Space>
      <WalletIcon style={{ width: 24, height: 24 }} wallet={wallet} />
      <Typography.Text>{shortenAddress(address)}</Typography.Text>
      <Button
        type="text"
        icon={<IonIcon name="log-out-outline" />}
        onClick={onDisconnect}
      />
    </Space>
  )
}
