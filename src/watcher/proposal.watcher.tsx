'use client'
import { Fragment, useCallback, useEffect, useState } from 'react'

import { useAtbash } from '@/hooks/atbash.hook'
import { useProposalStore } from '@/providers/proposal.provider'

const ProposalWatcher = () => {
  const [watchId, setWatchId] = useState(0)
  const atbash = useAtbash()
  const upsertProposal = useProposalStore(
    ({ upsertProposal }) => upsertProposal,
  )

  const watchData = useCallback(async () => {
    const { connection } = atbash.program.provider
    const watchId = connection.onProgramAccountChange(
      atbash.program.account.proposal.programId,
      (info) => {
        const address = info.accountId.toBase58()
        const buffer = info.accountInfo.data
        const accountData = atbash.program.coder.accounts.decode(
          'proposal',
          buffer,
        )
        upsertProposal(address, accountData)
      },
      'confirmed',
    )
    setWatchId(watchId)
  }, [atbash, upsertProposal])

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

export default ProposalWatcher
