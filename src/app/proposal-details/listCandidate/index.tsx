'use client'
import { Fragment } from 'react'

import { Card, Col, Row, Typography } from 'antd'
import CandidateCard from './candidateCard'

import { useMetadata } from '@/hooks/atbash.hook'

type CandidateCardProps = {
  proposalAddress: string
}

export default function ListCandidate({ proposalAddress }: CandidateCardProps) {
  const metadata = useMetadata(proposalAddress)

  if (!metadata) return <Fragment></Fragment>
  const candidates = metadata.proposalMetadata.candidateMetadata

  return (
    <Card className="card-info">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title level={4} style={{ color: 'white' }}>
            List Candidate
          </Typography.Title>
        </Col>
        {Object.keys(candidates).map((candidateAddress) => {
          return (
            <Col span={8} key={candidateAddress}>
              <CandidateCard
                candidateAddress={candidateAddress}
                proposalAddress={proposalAddress}
              />
            </Col>
          )
        })}
      </Row>
    </Card>
  )
}
