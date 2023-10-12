import { useState } from 'react'

import { Col, Row, Space, Typography, Tooltip, Button, Input } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import { isAddress } from '@/helpers/utils'
import { useProposalData } from '@/providers/proposal.provider'
import { web3 } from '@coral-xyz/anchor'

type BodyVoterTableProps = {
  address: string
  index: number
}

export default function BodyVoterTable({
  address,
  index,
}: BodyVoterTableProps) {
  const [isEdit, setIsEdit] = useState(false)
  const [walletAddress, setWalletAddress] = useState(address)
  const [walletError, setWalletError] = useState('')
  const { proposalData, setProposalData } = useProposalData()

  const voters = proposalData.voters

  const onSave = () => {
    if (!isAddress(walletAddress)) return setWalletError('Wrong wallet address')
    const updatedVoters = voters.map((voterAddr) =>
      voterAddr.toString() === address
        ? new web3.PublicKey(walletAddress)
        : voterAddr,
    )

    setProposalData({
      ...proposalData,
      voters: updatedVoters,
    })

    return setIsEdit(false)
  }

  const onDelete = () => {
    const updatedVoters = voters.filter(
      (voterAddr) => voterAddr.toString() !== address,
    )

    setProposalData({
      ...proposalData,
      voters: updatedVoters,
    })
  }

  return (
    <Row gutter={[16, 8]} align="middle" className="table-item">
      <Col span={4}>
        <Typography.Text>#{index + 1}</Typography.Text>
      </Col>
      <Col span={16}>
        {isEdit ? (
          <Row>
            <Col span={24}>
              <Input
                value={walletAddress}
                name="name"
                className="recipient-input"
                autoComplete="off"
                onChange={(e) => setWalletAddress(e.target.value)}
              />
            </Col>
            {walletError && (
              <Col span={24}>
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
              </Col>
            )}
          </Row>
        ) : (
          <Typography.Text>{address}</Typography.Text>
        )}
      </Col>

      <Col span={4} style={{ textAlign: 'right' }}>
        {isEdit ? (
          <Space>
            <Tooltip title={'Cancel'}>
              <Button
                onClick={() => setIsEdit(false)}
                icon={<IonIcon name="close-outline" />}
                style={{ padding: 0, color: '#fff' }}
                type="text"
              />
            </Tooltip>
            <Tooltip title={'Save'}>
              <Button
                onClick={onSave}
                icon={<IonIcon name="checkmark-outline" />}
                style={{ padding: 0, color: '#eab15a' }}
                type="text"
              />
            </Tooltip>
          </Space>
        ) : (
          <Space>
            <Button
              onClick={onDelete}
              icon={<IonIcon name="trash-outline" />}
              style={{ padding: 0, color: '#fff' }}
              type="text"
            />
            <Button
              onClick={() => setIsEdit(true)}
              icon={<IonIcon name="create-outline" />}
              style={{ padding: 0, color: '#fff' }}
              type="text"
            />
          </Space>
        )}
      </Col>
    </Row>
  )
}
