import { Col, Row, Typography } from 'antd'

export default function HeaderCandidateTable() {
  return (
    <Row gutter={[16, 8]} align="middle" className="table-header">
      <Col span={2}>
        <Typography.Text>No.</Typography.Text>
      </Col>
      <Col span={4}>
        <Typography.Text>Avatar</Typography.Text>
      </Col>
      <Col span={6}>
        <Typography.Text>Name</Typography.Text>
      </Col>
      <Col span={8}>
        <Typography.Text>Description</Typography.Text>
      </Col>
      <Col span={4} />
    </Row>
  )
}
