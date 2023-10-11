'use client'
import { Fragment, useMemo } from 'react'

import { Image, Typography } from 'antd'

import { useMetadata } from '@/hooks/atbash.hook'
import { useProposalByAddress } from '@/providers/proposal.provider'

const ProposalWinder = ({ proposalAddress }: { proposalAddress: string }) => {
  const proposal = useProposalByAddress(proposalAddress)
  const { proposalMetadata } = useMetadata(proposalAddress) || {
    proposalMetadata: { candidateMetadata: {} },
  }
  const candidates = proposalMetadata?.candidateMetadata

  const winner = useMemo(() => {
    if (!proposal.result.length || !candidates) return
    const num = proposal.result.map((e) => e.toNumber())
    const max = Math.max(...num)
    const i = num.findIndex((e) => e === max)
    return candidates[proposal.candidates[i].toBase58()]
  }, [candidates, proposal.candidates, proposal.result])

  if (!winner) return <Fragment />

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <Image
        alt=""
        style={{ borderRadius: 8 }}
        src={winner.avatar}
        preview={false}
        width={128}
        height={128}
      />
      <div
        style={{
          position: 'absolute',
          background: 'rgba(0, 0, 0, 0.6)',
          bottom: 0,
          left: 0,
          padding: 8,
          borderRadius: 8,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography.Text className="caption"> Candidate winner</Typography.Text>
      </div>
    </div>
  )
}

export default ProposalWinder
