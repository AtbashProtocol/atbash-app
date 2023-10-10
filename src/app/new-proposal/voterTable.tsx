'use client'
import { web3 } from '@coral-xyz/anchor'

import { Col, Empty, Row, Typography } from 'antd'

type VoterTableProp = {
  voters: web3.PublicKey[]
}
export default function VoterTable({ voters }: VoterTableProp) {
  return (
    <Row>
      <Col span={24}>
        <Row gutter={[0, 0]} align="middle">
          <Col
            span={4}
            style={{ textAlign: 'center', border: '1px solid #EAB15A' }}
          >
            <Typography.Text>No.</Typography.Text>
          </Col>
          <Col
            span={20}
            style={{ textAlign: 'center', border: '1px solid #EAB15A' }}
          >
            <Typography.Text>Wallet Address</Typography.Text>
          </Col>
          {!voters.length && (
            <Col
              span={24}
              style={{ textAlign: 'center', border: '1px solid #EAB15A' }}
            >
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </Col>
          )}
        </Row>
      </Col>
      {voters.map((voter, index) => {
        return (
          <Col span={24} key={voter.toString()}>
            <Row gutter={[0, 0]} align="middle">
              <Col
                span={4}
                style={{ textAlign: 'center', border: '1px solid #EAB15A' }}
              >
                <Typography.Text>{index + 1}.</Typography.Text>
              </Col>
              <Col
                span={20}
                style={{ textAlign: 'center', border: '1px solid #EAB15A' }}
              >
                <Typography.Text>{voter.toString()}</Typography.Text>
              </Col>
            </Row>
          </Col>
        )
      })}
    </Row>
  )
}
