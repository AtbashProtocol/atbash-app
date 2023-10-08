'use client'
import Link from 'next/link'
import { useWallet } from '@solana/wallet-adapter-react'

import { Col, Row, Image, Card, Typography, Divider } from 'antd'
import StatusTag from '@/components/statusTag'

import { useMetadata } from '@/hooks/atbash.hook'
import { Fragment, useMemo } from 'react'
import { useProposalByAddress } from '@/providers/proposal.provider'
import dayjs from 'dayjs'
import { encode } from 'bs58'

type CampaignCardProps = {
  proposalAddress: string
}

export default function ProposalCard({ proposalAddress }: CampaignCardProps) {
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

  if (!metadata) return <Fragment></Fragment>

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
            src={metadata.proposalMetadata.image}
            preview={false}
          />
        </Col>
        <Col span={24}>
          <Card className="campaigns-card-body">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Typography.Title level={4} style={{ color: 'black' }}>
                  {metadata.proposalMetadata.title}
                </Typography.Title>
              </Col>
              <Col span={24}>
                <Row align="middle">
                  <Col>
                    <StatusTag isOwner={isOwner} />
                  </Col>
                  <Col>
                    <Divider style={{ borderColor: 'black' }} type="vertical" />
                  </Col>
                  <Col>
                    <Typography.Text
                      style={{ color: 'black', fontSize: '0.8rem' }}
                    >
                      Voting period:{' '}
                      {dayjs(Number(startDate)).format('D/MM/YYYY')} -{' '}
                      {dayjs(Number(endDate)).format('D/MM/YYYY')}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>{metadata.proposalMetadata.description}</Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Link>
  )
}
