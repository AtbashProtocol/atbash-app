'use client'
import { Col, Row } from 'antd'
import Header from './header'

import { useProposals } from '@/providers/proposal.provider'

export default function Home() {
  const proposals = useProposals()
  console.log(proposals)

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Header />
      </Col>
    </Row>
  )
}
