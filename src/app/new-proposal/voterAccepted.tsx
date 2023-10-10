'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { web3 } from '@coral-xyz/anchor'

import { Button, Col, Input, Row, Space, Typography } from 'antd'
import SpaceVertical from './spaceVertical'
import IonIcon from '@sentre/antd-ionicon'
import VoterTable from './voterTable'

import { useGlobalProposal } from './page'
import { useInitProposal } from '@/hooks/atbash.hook'
import { isAddress } from '@/helpers/utils'

type VoterAcceptedProp = {
  onBack: () => void
}

export default function VoterAccepted({ onBack }: VoterAcceptedProp) {
  const [voterAddr, setVoterAddr] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [walletError, setWalletError] = useState('')
  const { push } = useRouter()
  const [proposalData, setProposalData] = useGlobalProposal()

  const initProposal = useInitProposal(proposalData)
  const voters = proposalData.voters

  const onNewVoter = () => {
    if (!isAddress(voterAddr)) return setWalletError('Wrong wallet address')
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
      console.log('Successfully Created Proposal, ', txId)
    } catch (error) {
      console.error('Failed to Create Proposal', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row gutter={[20, 20]} justify={'center'}>
      <Col span={24}>
        <Typography.Title level={3}>Create Num Voter</Typography.Title>
        <Typography.Text>
          Enter the number of votes in the campaign
        </Typography.Text>
      </Col>
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
          <Row gutter={[12, 8]}>
            <Col span={24}>
              <Input
                placeholder="Input Address Voter"
                value={voterAddr}
                onChange={(e) => setVoterAddr(e.target.value)}
              />
            </Col>
            <Col span={24}>
              {walletError && (
                <Col span={24}>
                  <Space>
                    <IonIcon
                      style={{ color: '#f2323f' }}
                      name="warning-outline"
                    />
                    <Typography.Text type="danger">
                      {walletError}
                    </Typography.Text>
                  </Space>
                </Col>
              )}
            </Col>
          </Row>
        </SpaceVertical>
      </Col>

      <Col span={24} style={{ textAlign: 'right' }}>
        <Button onClick={onNewVoter} type="primary" size="large">
          Add
        </Button>
      </Col>
      <Col span={24}>
        <VoterTable voters={voters} />
      </Col>

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
