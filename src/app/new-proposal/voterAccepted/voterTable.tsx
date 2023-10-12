'use client'
import { web3 } from '@coral-xyz/anchor'

import { Card, Col, Empty, Row } from 'antd'
import HeaderVoterTable from './headerVoterTable'
import BodyVoterTable from './bodyVoterTable'

type VoterTableProp = {
  voters: web3.PublicKey[]
}
export default function VoterTable({ voters }: VoterTableProp) {
  return (
    <Card bordered={false} className="table-container">
      <Row gutter={[8, 13]}>
        <Col span={24}>
          <HeaderVoterTable />
        </Col>
        {voters.map((address, idx) => (
          <Col span={24} key={address.toString() + idx}>
            <BodyVoterTable index={idx} address={address.toString()} />
          </Col>
        ))}
        {voters.length === 0 && (
          <Col span={24}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </Col>
        )}
      </Row>
    </Card>
  )
}
