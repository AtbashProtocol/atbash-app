'use client'
import { ReactNode } from 'react'

import { Col, Row } from 'antd'

type SpaceVerticalProps = {
  label: ReactNode | string
  children: JSX.Element
}

export default function SpaceVertical({ label, children }: SpaceVerticalProps) {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>{label}</Col>
      <Col span={24}>{children}</Col>
    </Row>
  )
}
