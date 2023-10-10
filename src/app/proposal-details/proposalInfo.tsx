'use client'
import { useMemo } from 'react'
import dayjs from 'dayjs'
import { useWallet } from '@solana/wallet-adapter-react'

import StatusTag from '@/components/statusTag'
import { Card, Col, Row, Button, Typography, Tag, Divider } from 'antd'

import { useMetadata } from '@/hooks/atbash.hook'
import { useProposalByAddress } from '@/providers/proposal.provider'
import EndIn from '../listProposal/endIn'

type ProposalInfoProps = {
  proposalAddress: string
}

export default function ProposalInfo({ proposalAddress }: ProposalInfoProps) {
  const metadata = useMetadata(proposalAddress)
  const { wallet } = useWallet()
  const { authority, startDate, endDate } =
    useProposalByAddress(proposalAddress)

  const address = useMemo(
    () => (wallet && wallet.adapter.publicKey?.toBase58()) || '',
    [wallet],
  )
  const isOwner = address === authority.toString()
  const now = new Date().getTime()
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
              {isEnded && isOwner && <Button type="primary">Get Result</Button>}
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row align="middle">
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
              <Divider style={{ borderColor: 'white' }} type="vertical" />
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
