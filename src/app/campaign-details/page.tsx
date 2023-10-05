'use client'

import { Button, Col, Row } from 'antd'
import Header from '@/components/header'

export default function CampaignDetails() {
  return (
    <Row gutter={[0, 24]} justify="center">
      <Col span={24}>
        <Header />
      </Col>
      <Col span={24}>
        <h1>Campaign Details</h1>
        <Button type="primary" size="large">
          Get Result
        </Button>
      </Col>
    </Row>
  )
}
