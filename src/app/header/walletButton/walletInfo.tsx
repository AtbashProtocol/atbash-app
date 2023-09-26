'use client'
import { Fragment, useCallback, useMemo, useState } from 'react'
import { Wallet } from '@solana/wallet-adapter-react'
import copy from 'copy-to-clipboard'
import { BN } from 'bn.js'

import { WalletIcon } from '@solana/wallet-adapter-react-ui'

import { asyncWait, numeric, shortenAddress } from '@/helpers/utils'
import { solscan } from '@/helpers/explorers'
import solConfig from '@/configs/sol.config'
import { useLamports } from '@/providers/wallet.provider'
import { undecimalize } from '@/helpers/decimals'
import { Button, Row, Space, Typography } from 'antd'

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
    <Fragment>
      <Space>
        <WalletIcon style={{ width: 24, height: 24 }} wallet={wallet} />
        <Typography.Text>{shortenAddress(address)}</Typography.Text>
        <Button onClick={onDisconnect}>Disconnect</Button>
      </Space>
    </Fragment>
  )
}
