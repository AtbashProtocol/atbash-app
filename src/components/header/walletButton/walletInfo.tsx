'use client'
import { useCallback, useMemo, useState } from 'react'
import { Wallet } from '@solana/wallet-adapter-react'
import copy from 'copy-to-clipboard'

import CopyToClipboard from 'react-copy-to-clipboard'
import IonIcon from '@sentre/antd-ionicon'
import { WalletIcon } from '@solana/wallet-adapter-react-ui'
import { Button, Space, Tooltip, Typography } from 'antd'

import { asyncWait, shortenAddress } from '@/helpers/utils'

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
    <Space className="btn-wallet">
      <WalletIcon style={{ width: 24, height: 24 }} wallet={wallet} />
      <Typography.Text style={{ color: 'black' }}>
        {shortenAddress(address)}
      </Typography.Text>
      <Tooltip title="Copied" open={copied}>
        <CopyToClipboard text={address}>
          <Button
            type="text"
            icon={<IonIcon name="copy-outline" />}
            onClick={onCopy}
          />
        </CopyToClipboard>
      </Tooltip>
      <Button
        type="text"
        icon={<IonIcon name="log-out-outline" />}
        onClick={onDisconnect}
      />
    </Space>
  )
}
