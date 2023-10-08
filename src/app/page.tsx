'use client'
import { Col, Row } from 'antd'
import Banner from './banner'
import ListProposal from './listProposal'

export default function Home() {
  return (
    <Row gutter={[0, 24]} justify="center" align="middle">
      <Col span={24}>
        <Banner />
      </Col>
      <Col xs={24} md={20} span={24} style={{ padding: 24 }}>
        <ListProposal />
      </Col>
    </Row>
  )
}
