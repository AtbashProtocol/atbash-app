'use client'
import { Fragment, ReactNode, useCallback, useEffect } from 'react'
import { produce } from 'immer'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { BN } from 'bn.js'
import { SystemProgram } from '@solana/web3.js'

import { env } from '@/configs/env'
import { ProposalData } from 'atbash-protocol'
import { useAtbash } from '@/hooks/atbash.hook'

export type ProposalStore = {
  proposals: Record<string, ProposalData>
  upsertProposal: (address: string, newPool: ProposalData) => void
}

/**
 * Store
 */
export const useProposalStore = create<ProposalStore>()(
  devtools(
    (set) => ({
      proposals: {},
      upsertProposal: (address: string, poolData: ProposalData) =>
        set(
          produce<ProposalStore>(({ proposals: pools }) => {
            pools[address] = poolData
          }),
          false,
          'ProposalData',
        ),
    }),
    {
      name: 'proposal',
      enabled: env === 'development',
    },
  ),
)

/**
 * Provider
 */
export function ProposalProvider({ children }: { children: ReactNode }) {
  const upsertProposal = useProposalStore(
    ({ upsertProposal }) => upsertProposal,
  )
  const atbash = useAtbash()

  const fetchProposals = useCallback(async () => {
    const proposals = await atbash.program.account.proposal.all()
    for (const proposal of proposals) {
      const proposalData = proposal.account as ProposalData
      upsertProposal(proposal.publicKey.toBase58(), proposalData)
    }
  }, [atbash.program.account.proposal, upsertProposal])

  useEffect(() => {
    fetchProposals()
  }, [fetchProposals])

  return <Fragment>{children}</Fragment>
}

/**
 * Hooks
 */

/**
 * Get all proposals
 * @returns Proposals list
 */
export const useProposals = () => {
  const pools = useProposalStore(({ proposals: pools }) => pools)
  return pools
}

/**
 * Get proposal data by proposal address
 * @returns proposalData
 */
export const useProposalByAddress = (poolAddress: string) => {
  const proposal = useProposalStore(
    ({ proposals }) => proposals[poolAddress],
  ) || {
    authority: SystemProgram.programId,
    ballotBoxes: [],
    candidates: [],
    endDate: new BN(0),
    merkleRoot: [],
    metadata: [],
    randomNumbers: [],
    startDate: new BN(0),
  }
  return proposal
}
