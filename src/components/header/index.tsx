'use client'

import { Col, Image, Row, Space, Spin } from 'antd'
import Island from '@/components/island'
import WalletButton from './walletButton'
import Guideline from '@/app/guideline'

export default function Header() {
  return (
    <Row gutter={[24, 24]} justify="space-between" align="middle">
      <Col>
        <Image
          preview={false}
          height={50}
          alt="Atbash Protocol"
          src="/brand.svg"
        />
      </Col>
      <Col>
        <Space size={16}>
          <Guideline />
          <Island Loading={Spin}>
            <WalletButton />
          </Island>
        </Space>
      </Col>
    </Row>
  )
}
