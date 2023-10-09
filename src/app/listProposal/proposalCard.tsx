'use client'
import Link from 'next/link'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'

import { Col, Row, Image, Card, Typography, Divider } from 'antd'
import StatusTag from '@/components/statusTag'

import { useMetadata } from '@/hooks/atbash.hook'
import { useProposalByAddress } from '@/providers/proposal.provider'
import EndIn from './endIn'

type CampaignCardProps = {
  proposalAddress: string
}

export default function ProposalCard({ proposalAddress }: CampaignCardProps) {
  const { proposalMetadata } = useMetadata(proposalAddress) || {
    proposalMetadata: { title: '', description: '', image: '' },
  }
  const { wallet } = useWallet()
  const { authority, startDate, endDate } =
    useProposalByAddress(proposalAddress)
  const endTime = endDate.toNumber() * 1000

  const address = useMemo(
    () => (wallet && wallet.adapter.publicKey?.toBase58()) || '',
    [wallet],
  )
  const isOwner = address === authority.toString()
  const isEnded = endTime <= Date.now()

  return (
    <Link href={`/proposal-details?proposalAddress=${proposalAddress}`}>
      <Row className="campaigns-card">
        <Col span={24} className="campaigns-card-tags">
          {isEnded && <StatusTag isGetResult={isEnded} />}{' '}
          <StatusTag isEnded={isEnded} isLive={!isEnded} />
        </Col>
        <Col span={24} className="campaigns-card-header">
          <Image
            alt=""
            style={{ aspectRatio: '16/9', objectFit: 'cover' }}
            src={proposalMetadata.image}
            preview={false}
          />
        </Col>
        <Col span={24}>
          <Card className="campaigns-card-body">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Typography.Title level={4} style={{ color: 'black' }}>
                  {proposalMetadata.title}
                </Typography.Title>
              </Col>
              <Col span={24}>
                <Row align="middle">
                  <Col flex="auto">
                    <StatusTag isOwner={isOwner} />
                  </Col>
                  <Col>
                    <EndIn proposalAddress={proposalAddress} />
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Typography.Paragraph ellipsis={{ rows: 3 }}>
                  {proposalMetadata.description}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Link>
  )
}
