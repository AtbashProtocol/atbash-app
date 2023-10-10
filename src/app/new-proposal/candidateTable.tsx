'use client'

import { CandidateMetadata } from '@/hooks/atbash.hook'
import { Avatar, Col, Empty, Row, Typography } from 'antd'

type CandidateTableProp = {
  candidates: Record<string, CandidateMetadata>
}
export default function CandidateTable({ candidates }: CandidateTableProp) {
  return (
    <Row>
      {/* List Candidate */}
      <Col span={24}>
        <Row gutter={[0, 0]} align="middle">
          <Col
            span={4}
            style={{ textAlign: 'center', border: '1px solid #EAB15A' }}
          >
            <Typography.Text>No.</Typography.Text>
          </Col>
          <Col
            span={4}
            style={{ textAlign: 'center', border: '1px solid #EAB15A' }}
          >
            <Typography.Text>Avatar</Typography.Text>
          </Col>
          <Col
            span={4}
            style={{ textAlign: 'center', border: '1px solid #EAB15A' }}
          >
            <Typography.Text>Name</Typography.Text>
          </Col>
          <Col
            span={12}
            style={{ textAlign: 'center', border: '1px solid #EAB15A' }}
          >
            <Typography.Text>Description</Typography.Text>
          </Col>
          {!Object.values(candidates).length && (
            <Col
              span={24}
              style={{ textAlign: 'center', border: '1px solid #EAB15A' }}
            >
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </Col>
          )}
        </Row>
      </Col>
      {Object.values(candidates).map(({ avatar, name, description }, index) => {
        return (
          <Col span={24} key={name}>
            <Row gutter={[0, 0]} align="middle">
              <Col
                span={4}
                style={{
                  height: 50,
                  textAlign: 'center',
                  border: '1px solid #EAB15A',
                }}
              >
                <Typography.Text>{index + 1}.</Typography.Text>
              </Col>
              <Col
                span={4}
                style={{
                  height: 50,
                  textAlign: 'center',
                  border: '1px solid #EAB15A',
                }}
              >
                <Avatar size={40} src={avatar} />
              </Col>
              <Col
                span={4}
                style={{
                  height: 50,
                  textAlign: 'center',
                  border: '1px solid #EAB15A',
                }}
              >
                <Typography.Text>{name}</Typography.Text>
              </Col>
              <Col
                span={12}
                style={{
                  height: 50,
                  textAlign: 'center',
                  border: '1px solid #EAB15A',
                }}
              >
                <Typography.Text>{description}</Typography.Text>
              </Col>
            </Row>
          </Col>
        )
      })}
    </Row>
  )
}
