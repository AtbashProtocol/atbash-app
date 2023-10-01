'use client'
import { useState } from 'react'
import { web3 } from '@coral-xyz/anchor'

import { Button, Col, Input, Row, Typography } from 'antd'
import SpaceVertical from './spaceVertical'

import { useGlobalProposal } from './page'
import { useInitProposal } from '@/hooks/atbash.hook'

type VoterAcceptedProp = {
  onBack: () => void
}

export default function VoterAccepted({ onBack }: VoterAcceptedProp) {
  const [voterAddr, setVoterAddr] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [proposalData, setProposalData] = useGlobalProposal()

  const initProposal = useInitProposal(proposalData)
  const voters = proposalData.voters

  const onNewVoter = () => {
    if (!voterAddr) return
    voters.push(new web3.PublicKey(voterAddr))
    setVoterAddr('')

    return setProposalData({
      ...proposalData,
      voters: voters,
    })
  }

  const onCreateProposal = async () => {
    try {
      setLoading(true)
      const txId = await initProposal()
      console.log('Successfully Created Proposal')
    } catch (error) {
      console.error('Failed to Create Proposal', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row gutter={[20, 20]} justify={'center'}>
      <Col span={24}>
        <SpaceVertical
          label={
            <Row>
              <Col>
                <Typography.Text>Wallet Address Voter</Typography.Text>
              </Col>
            </Row>
          }
        >
          <Input
            placeholder="Input Address Voter"
            value={voterAddr}
            onChange={(e) => setVoterAddr(e.target.value)}
          />
        </SpaceVertical>
      </Col>

      <Col span={24} style={{ textAlign: 'right' }}>
        <Button onClick={onNewVoter} type="primary" size="large">
          Add
        </Button>
      </Col>
      <Col span={24}>
        <Row gutter={[16, 8]} align="middle" style={{ padding: 8 }}>
          <Col span={4}>
            <Typography.Text>No.</Typography.Text>
          </Col>
          <Col span={20}>
            <Typography.Text>Wallet Address</Typography.Text>
          </Col>
        </Row>
      </Col>
      {voters.map((voter, index) => {
        return (
          <Col span={24} key={voter.toString()}>
            <Row gutter={[16, 8]} align="middle" style={{ padding: 8 }}>
              <Col span={4}>
                <Typography.Text>{index + 1}.</Typography.Text>
              </Col>
              <Col span={20}>
                <Typography.Text>{voter.toString()}</Typography.Text>
              </Col>
            </Row>
          </Col>
        )
      })}

      {/* Action */}
      <Col span={24} />
      <Col span={24}>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Button onClick={onBack} block type="dashed" size="large">
              Back
            </Button>
          </Col>
          <Col span={12}>
            <Button
              block
              onClick={onCreateProposal}
              type="primary"
              size="large"
              loading={loading}
            >
              Create Proposal
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
