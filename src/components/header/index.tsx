'use client'

import Island from '@/components/island'
import WalletButton from './walletButton'
import { Button, Col, Image, Row, Space, Spin, Typography } from 'antd'

export default function Header() {
  return (
    <Row gutter={[24, 24]}>
      <Col flex="auto">
        <Image
          preview={false}
          height={50}
          alt="Atbash Protocol"
          src="/brand.svg"
        />
      </Col>
      <Col>
        <Space size={16}>
          <Button size="large">How to vote</Button>
          <Island Loading={Spin}>
            <WalletButton />
          </Island>
        </Space>
      </Col>
    </Row>
  )
}
