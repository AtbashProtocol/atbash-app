'use client'
import { useState } from 'react'

import IonIcon from '@sentre/antd-ionicon'
import { Button, Col, Row, Typography, Select } from 'antd'
import ListCampaigns from './listCampaigns'
import { useRouter } from 'next/navigation'

enum FilterCampaigns {
  AllCampaigns = 'all-campaigns',
  LiveCampaigns = 'live-campaigns',
  EndedCampaigns = 'ended-campaigns',
}
export default function Campaigns() {
  const [filterPool, setFilterPool] = useState(FilterCampaigns.AllCampaigns)
  const { push } = useRouter()
  return (
    <Row gutter={[0, 12]} justify="center" align="middle">
      <Col xs={24} md={20} span={24}>
        <Row gutter={[12, 12]} align="middle">
          <Col>
            <Typography.Title level={3}>All Campaigns</Typography.Title>
          </Col>
          <Col flex="auto" />
          <Col>
            <Select
              value={filterPool}
              onChange={(value) => {
                setFilterPool(value)
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
      <Col xs={24} md={20} span={24}>
        <ListCampaigns />
      </Col>
    </Row>
  )
}
