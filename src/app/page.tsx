'use client'
import { useRouter } from 'next/navigation'

import Header from './header'
import { Button, Col, Row } from 'antd'

export default function Home() {
  const { push } = useRouter()
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Header />
      </Col>
      <Col span={24}>
        <Button onClick={() => push('/new-proposal')} type="primary">
          Create Proposal
        </Button>
      </Col>
    </Row>
  )
}
