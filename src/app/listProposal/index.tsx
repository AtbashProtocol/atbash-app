'use client'
import { useState } from 'react'

import IonIcon from '@sentre/antd-ionicon'
import { Button, Col, Row, Typography, Select } from 'antd'
import { useRouter } from 'next/navigation'
import ProposalCard from './proposalCard'

import { useProposals } from '@/providers/proposal.provider'
import { useMetadata } from '@/hooks/atbash.hook'
import './index.scss'

enum FilterCampaigns {
  AllCampaigns = 'all-campaigns',
  LiveCampaigns = 'live-campaigns',
  EndedCampaigns = 'ended-campaigns',
}
export default function ListProposal() {
  const [filterCampaign, setFilterCampaign] = useState(
    FilterCampaigns.AllCampaigns,
  )
  const { push } = useRouter()
  const proposals = useProposals()

  return (
    <Row gutter={[8, 12]}>
      <Col span={24}>
        <Row gutter={[12, 12]} align="middle">
          <Col>
            <Typography.Title level={3} style={{ color: '#EAB15A' }}>
              All Campaigns
            </Typography.Title>
          </Col>
          <Col flex="auto" />
          <Col>
            <Select
              value={filterCampaign}
              onChange={(value) => {
                setFilterCampaign(value)
              }}
              style={{ width: 100, height: '40px' }}
              className="category"
            >
              <Select.Option value={FilterCampaigns.AllCampaigns}>
                All
              </Select.Option>
              <Select.Option value={FilterCampaigns.LiveCampaigns}>
                Live
              </Select.Option>
              <Select.Option value={FilterCampaigns.EndedCampaigns}>
                Ended
              </Select.Option>
            </Select>
          </Col>
          <Col>
            <Button
              type="primary"
              size="large"
              onClick={() => push('/new-proposal')}
              icon={<IonIcon name="add-circle-outline" />}
            >
              Create New Campaign
            </Button>
          </Col>
        </Row>
      </Col>
      {Object.keys(proposals).map((proposalAddress) => {
        return (
          <Col span={8} key={proposalAddress}>
            <ProposalCard proposalAddress={proposalAddress} />
          </Col>
        )
      })}
    </Row>
  )
}
