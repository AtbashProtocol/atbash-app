'use client'
import { useMemo } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'

import { Card, Col, Row, Button, Typography } from 'antd'
import StatusTag from '@/components/statusTag'
import EndIn from '../listProposal/endIn'

import { useMetadata } from '@/hooks/atbash.hook'
import { useProposalByAddress } from '@/providers/proposal.provider'
import IonIcon from '@sentre/antd-ionicon'
import GetResult from './getResult'

type ProposalInfoProps = {
  proposalAddress: string
}

export default function ProposalInfo({ proposalAddress }: ProposalInfoProps) {
  const metadata = useMetadata(proposalAddress)
  const { wallet } = useWallet()
  const { authority, endDate } = useProposalByAddress(proposalAddress)

  const address = useMemo(
    () => (wallet && wallet.adapter.publicKey?.toBase58()) || '',
    [wallet],
  )
  const isOwner = address === authority.toString()
  const now = new Date().getTime() / 1000
  const isEnded = Number(endDate) <= now

  return (
    <Card className="card-info">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row align="middle" justify="space-between">
            <Col>
              <Typography.Title level={4} style={{ color: 'white' }}>
                {metadata && metadata.proposalMetadata.title}
              </Typography.Title>
            </Col>
            <Col>
              {isOwner && <GetResult proposalAddress={proposalAddress} />}
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[8, 8]} align="middle">
            <Col>
              {isEnded && isOwner && <StatusTag isGetResult={isEnded} />}{' '}
              <StatusTag
                isOwner={isOwner}
                isEnded={isEnded}
                isLive={!isEnded}
                color="white"
              />
            </Col>
            <Col>
              <EndIn proposalAddress={proposalAddress} />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[0, 12]}>
            <Col span={24}>
              <Typography.Title level={4}>Description</Typography.Title>
            </Col>
            <Col span={24}>
              {metadata && metadata.proposalMetadata.description}
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}
