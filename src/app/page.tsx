'use client'
import { Col, Row } from 'antd'
import Banner from './banner'
import Campaigns from './campaigns'

export default function Home() {
  return (
    <Row gutter={[0, 24]}>
      <Col span={24}>
        <Banner />
      </Col>
      <Col span={24}>
        <Campaigns />
      </Col>
    </Row>
  )
}
