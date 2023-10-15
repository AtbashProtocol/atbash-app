'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { web3 } from '@coral-xyz/anchor'

import {
  Button,
  Col,
  Input,
  Modal,
  Row,
  Space,
  Typography,
  notification,
} from 'antd'
import SpaceVertical from '../spaceVertical'
import IonIcon from '@sentre/antd-ionicon'
import VoterTable from './voterTable'

import { useInitProposal } from '@/hooks/atbash.hook'
import { isAddress } from '@/helpers/utils'
import { useProposalData } from '@/providers/proposal.provider'
import UploadFile from './uploadFile'
import { NotificationPlacement } from 'antd/es/notification/interface'
import SuccessModal from './successModal'

type VoterAcceptedProp = {
  onBack: () => void
}
type NotificationType = 'success' | 'info' | 'warning' | 'error'

export default function VoterAccepted({ onBack }: VoterAcceptedProp) {
  const [voterAddr, setVoterAddr] = useState<string>()
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [walletError, setWalletError] = useState('')
  const [api, contextHolder] = notification.useNotification()
  const { push } = useRouter()
  const { proposalData, setProposalData } = useProposalData()

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
  const openNotification = (
    type: NotificationType,
    message: string,
    description: string,
    placement: NotificationPlacement,
  ) => {
    api[type]({
      message,
      description,
      placement,
    })
  }

  const onCreateProposal = async () => {
    try {
      setLoading(true)
      await initProposal()
      setVisible(true)
    } catch (err: any) {
      openNotification('error', 'Proposal creation failed', err.message, 'top')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row gutter={[20, 20]} justify={'center'}>
      {contextHolder}
      <Col span={24}>
        <Typography.Title level={3}>Voter Settings</Typography.Title>
        <Typography.Text>
          Add the Solana wallet addresses of the voters eligible to join the
          campaign
        </Typography.Text>
      </Col>
      <Col span={24}>
        <SpaceVertical
          label={
            <Row>
              <Col>
                <Typography.Text>Voter&rsquo;s Wallet Address</Typography.Text>
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
        <UploadFile />
      </Col>
      <Col span={24}>
        <VoterTable voters={voters} />
      </Col>

      {/* Action */}
      <Col span={24} />
      <Col span={24}>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Button onClick={onBack} block size="large">
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
            <Modal
              open={visible}
              onCancel={() => {
                push('/')
                setVisible(false)
              }}
              footer={null}
              destroyOnClose
              centered
            >
              <SuccessModal
                hideModal={() => {
                  push('/')
                  setVisible(false)
                }}
              />
            </Modal>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
