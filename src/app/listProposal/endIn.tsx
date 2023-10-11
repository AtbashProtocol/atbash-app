import { Col, Progress, Row, Space, Typography } from 'antd'
import TimeCountDown from './countDown'

import { useProposalByAddress } from '@/providers/proposal.provider'

import './index.scss'

const EndIn = ({ proposalAddress }: { proposalAddress: string }) => {
  const { endDate, startDate } = useProposalByAddress(proposalAddress)
  const totalTime = endDate.toNumber() - startDate.toNumber()
  const recent = Date.now() / 1000 - startDate.toNumber()
  const percent = recent / totalTime

  const isStarted = Date.now() / 1000 > startDate.toNumber()
  const time = !isStarted ? startDate : endDate
  const endTime = Date.now() / 1000 > endDate.toNumber()

  return (
    <Row align="middle" gutter={[8, 8]}>
      {!endTime && (
        <Col flex="auto">
          <span>{isStarted ? 'Voting Period:' : 'Start in'}</span>
        </Col>
      )}
      <Col>
        <Space>
          <TimeCountDown endTime={time.toNumber()} />
          {isStarted && (
            <Progress
              type="circle"
              percent={percent * 100}
              showInfo={false}
              className="end-time-progress"
              strokeWidth={10}
              strokeColor="#EAB15A"
            />
          )}
        </Space>
      </Col>
    </Row>
  )
}

export default EndIn
