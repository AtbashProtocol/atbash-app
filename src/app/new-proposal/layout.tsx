import { ReactNode } from 'react'

import { Col, Row } from 'antd'

export default function NewProposalLayout({
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
