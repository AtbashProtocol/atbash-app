import { Col, Row, Typography } from 'antd'

export default function HeaderVoterTable() {
  return (
    <Row gutter={[16, 8]} align="middle" className="table-header">
      <Col span={4}>
        <Typography.Text>No.</Typography.Text>
      </Col>
      <Col span={16}>
        <Typography.Text>Wallet Address</Typography.Text>
      </Col>
      <Col span={4} />
    </Row>
  )
}
