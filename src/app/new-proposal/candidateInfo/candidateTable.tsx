'use client'

import { CandidateMetadata } from '@/hooks/atbash.hook'
import { Card, Col, Empty, Row } from 'antd'
import HeaderCandidateTable from './headerCandidateTable'
import BodyCandidateTable from './bodyCandidateTable'

type CandidateTableProp = {
  candidates: Record<string, CandidateMetadata>
}

export default function CandidateTable({ candidates }: CandidateTableProp) {
  return (
    <Card bordered={false} className="table-container">
      <Row align="middle">
        <Col span={24}>
          <HeaderCandidateTable />
        </Col>
        {Object.entries(candidates).map(
          ([address, { avatar, name, description }], idx) => (
            <Col span={24} key={address + idx}>
              <BodyCandidateTable
                name={name}
                avatar={avatar}
                description={description}
                index={idx}
                address={address}
              />
            </Col>
          ),
        )}
        {Object.keys(candidates).length === 0 && (
          <Col span={24}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </Col>
        )}
      </Row>
    </Card>
  )
}
