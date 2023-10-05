'use client'

import Island from '@/components/island'
import WalletButton from './walletButton'
import { Button, Col, Image, Row, Spin, Typography } from 'antd'

export default function Header() {
  return (
    <Row gutter={[24, 24]}>
      <Col>
        <Image
          preview={false}
          height={50}
          alt="Atbash Protocol"
          src="/brand.svg"
        />
      </Col>
      <Col flex="auto" />
      <Col>
        <Row align="middle" gutter={[16, 16]}>
          <Col>
            <Button size="large">How to vote</Button>
          </Col>
          <Col>
            <Island Loading={Spin}>
              <WalletButton />
            </Island>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
