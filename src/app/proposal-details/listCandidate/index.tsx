'use client'
import { Fragment } from 'react'

import { Card, Col, Row, Typography } from 'antd'
import CandidateCard from './candidateCard'

import { useMetadata } from '@/hooks/atbash.hook'
import { useProposalByAddress } from '@/providers/proposal.provider'

type CandidateCardProps = {
  proposalAddress: string
}

export default function ListCandidate({ proposalAddress }: CandidateCardProps) {
  const { candidates, endDate } = useProposalByAddress(proposalAddress)
  const ended = Date.now() / 1000 > endDate.toNumber()
  return (
    <Card className="card-info">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title level={4} style={{ color: 'white' }}>
            Campaign Candidate
          </Typography.Title>
        </Col>
        {candidates.map((publicKey) => {
          return (
            <Col span={8} key={publicKey.toBase58()}>
              <CandidateCard
                candidateAddress={publicKey.toBase58()}
                proposalAddress={proposalAddress}
                isEnded={ended}
              />
            </Col>
          )
        })}
      </Row>
    </Card>
  )
}
