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
      <Col sm={24} lg={22}>
        <ListProposal />
      </Col>
      <Col span={24} />
    </Row>
  )
}
