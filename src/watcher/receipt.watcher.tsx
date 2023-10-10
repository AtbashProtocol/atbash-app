'use client'
import { Fragment, useCallback, useEffect, useState } from 'react'

import { useAtbash } from '@/hooks/atbash.hook'
import { useProposalStore } from '@/providers/proposal.provider'
import { useWallet } from '@solana/wallet-adapter-react'

const ReceiptWatcher = () => {
  const [watchId, setWatchId] = useState(0)
  const { publicKey } = useWallet()

  const atbash = useAtbash()
  const upsertProposal = useProposalStore(
    ({ upsertProposal }) => upsertProposal,
  )

  const watchData = useCallback(async () => {
    if (!publicKey) return

    const { connection } = atbash.program.provider
    const watchId = connection.onProgramAccountChange(
      atbash.program.account.receipt.programId,
      (info) => {
        const address = info.accountId.toBase58()
        const buffer = info.accountInfo.data
        const accountData = atbash.program.coder.accounts.decode(
          'receipt',
          buffer,
        )
        upsertProposal(address, accountData)
      },
      'confirmed',
      [{ memcmp: { bytes: publicKey.toBase58(), offset: 8 } }],
    )
    setWatchId(watchId)
  }, [atbash, upsertProposal, publicKey])

  useEffect(() => {
    if (watchId) return
    watchData()
    return () => {
      ;(async () => {
        if (!watchId) return
        const { connection } = atbash.program.provider
        await connection.removeProgramAccountChangeListener(watchId)
        setWatchId(0)
      })()
    }
  }, [atbash, watchData, watchId])
  return <Fragment />
}

export default ReceiptWatcher
