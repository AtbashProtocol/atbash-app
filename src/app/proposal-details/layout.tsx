import { ReactNode } from 'react'

import { Col, Row } from 'antd'

import './index.scss'

export default function ProposalDetailsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <Row align="middle" justify="center">
      <Col span={24}>{children}</Col>
    </Row>
  )
}
