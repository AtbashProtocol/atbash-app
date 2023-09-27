'use client'

import Island from '@/components/island'
import WalletButton from './walletButton'
import { Col, Row, Spin, Typography } from 'antd'

export default function Header() {
  return (
    <Row gutter={[24, 24]}>
      <Col flex="auto">
        <Typography.Title level={3}>Atbash Protocol</Typography.Title>
      </Col>
      <Col>
        <Island Loading={Spin}>
          <WalletButton />
        </Island>
      </Col>
    </Row>
  )
}
