import { ReactNode } from 'react'

import { Col, Row } from 'antd'

export default function CampaignDetailsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <Row align="middle" justify="center">
      <Col xs={24} md={20} span={24} style={{ padding: 24 }}>
        {children}
      </Col>
    </Row>
  )
}
