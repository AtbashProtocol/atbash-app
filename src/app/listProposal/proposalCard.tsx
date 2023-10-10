'use client'
import Link from 'next/link'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'

import { Col, Row, Image, Card, Typography, Divider, Space } from 'antd'
import StatusTag from '@/components/statusTag'

import { useMetadata } from '@/hooks/atbash.hook'
import { useProposalByAddress } from '@/providers/proposal.provider'
import EndIn from './endIn'
import { useReceiptsByProposalAddress } from '@/providers/receipt.provider'

type CampaignCardProps = {
  proposalAddress: string
}

export default function ProposalCard({ proposalAddress }: CampaignCardProps) {
  const { proposalMetadata } = useMetadata(proposalAddress) || {
    proposalMetadata: { title: '', description: '', image: '' },
  }
  const { wallet } = useWallet()
  const { authority, endDate } = useProposalByAddress(proposalAddress)
  const endTime = endDate.toNumber() * 1000
  const receipt = useReceiptsByProposalAddress(proposalAddress)

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
        <Col span={24}>
          <Image
            alt=""
            style={{
              aspectRatio: '16/9',
              objectFit: 'cover',
              borderRadius: '8px 8px 0 0',
            }}
            src={proposalMetadata.image}
            preview={false}
          />
        </Col>
        <Col span={24}>
          <Card
            bordered={false}
            className="campaigns-card-body"
            style={{ borderRadius: '0px 0px 8px 8px' }}
            bodyStyle={{ padding: 8 }}
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Typography.Title level={4} style={{ color: 'black' }}>
                  {proposalMetadata.title}
                </Typography.Title>
              </Col>
              <Col span={24}>
                <Row align="middle">
                  <Col flex="auto">
                    <Space size={4}>
                      <StatusTag isOwner={isOwner} />
                      {receipt && <StatusTag isVoted />}
                    </Space>
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
