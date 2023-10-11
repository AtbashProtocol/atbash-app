'use client'
import { useState } from 'react'
import { web3 } from '@coral-xyz/anchor'
import { UploadChangeParam } from 'antd/es/upload'

import IonIcon from '@sentre/antd-ionicon'
import {
  Button,
  Col,
  Input,
  Row,
  Typography,
  Upload,
  Avatar,
  Space,
  Divider,
  Switch,
} from 'antd'
import SpaceVertical from '../spaceVertical'
import CandidateTable from './candidateTable'
import UploadFile from './uploadFile'

import { fileToBase64, isAddress } from '@/helpers/utils'
import { useProposalData } from '@/providers/proposal.provider'

type CandidateInfoProp = {
  onNext: () => void
  onBack: () => void
}

export default function CandidateInfo({ onNext, onBack }: CandidateInfoProp) {
  const [address, setAddress] = useState('')
  const [nameCandidate, setNameCandidate] = useState('')
  const [descCandidate, setDescCandidate] = useState('')
  const [avtCandidate, setAvtCandidate] = useState('')
  const [walletError, setWalletError] = useState('')
  const { proposalData, setProposalData } = useProposalData()

  const candidates = proposalData.proposalMetadata.candidateMetadata
  const candidatesAddr = proposalData.candidates

  const onChangeInfo = (keyCandidate: string, value: string) => {
    if (keyCandidate === 'name') setNameCandidate(value)
    if (keyCandidate === 'description') setDescCandidate(value)
  }

  const onFileChangeAvatar = (file: UploadChangeParam) => {
    const { fileList } = file
    const originFile = fileList[0].originFileObj as File
    fileToBase64(originFile, onChangeAvatar)
  }

  const onChangeAvatar = async (imgBase64: string) => {
    setAvtCandidate(imgBase64)
  }
  const onNewCandidate = () => {
    if (!isAddress(address)) return setWalletError('Wrong wallet address')
    const nextProposalMetadata = {
      ...proposalData.proposalMetadata,
      candidateMetadata: {
        ...candidates,
        [address]: {
          ...candidates[address],
          name: nameCandidate,
          description: descCandidate,
          avatar: avtCandidate,
        },
      },
    }
    candidatesAddr.push(new web3.PublicKey(address))
    setAddress('')
    setNameCandidate('')
    setDescCandidate('')
    setAvtCandidate('')

    return setProposalData({
      ...proposalData,
      proposalMetadata: nextProposalMetadata,
    })
  }

  return (
    <Row gutter={[20, 20]} justify={'center'}>
      <Col span={24}>
        <Typography.Title level={3}>Create Num Candidate</Typography.Title>
        <Typography.Text>
          Enter a list of candidates with a maximum of 8 candidate / 1 campaign
        </Typography.Text>
      </Col>
      <Col span={24}>
        <SpaceVertical
          label={
            <Row>
              <Col>
                <Typography.Text>Wallet Address Candidate</Typography.Text>
              </Col>
            </Row>
          }
        >
          <Row gutter={[12, 8]}>
            <Col span={24}>
              <Input
                placeholder="Input Address Candidate"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Col>
            {walletError && (
              <Col span={24}>
                <Space>
                  <IonIcon
                    style={{ color: '#f2323f' }}
                    name="warning-outline"
                  />
                  <Typography.Text type="danger">{walletError}</Typography.Text>
                </Space>
              </Col>
            )}
          </Row>
        </SpaceVertical>
      </Col>

      <Col span={24}>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Typography.Text>Fill in Candidate Info</Typography.Text>
          </Col>
          <Col span={24}>
            <Row gutter={[12, 12]}>
              <Col
                span={4}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {avtCandidate ? (
                  <Avatar size={80} src={avtCandidate} />
                ) : (
                  <Upload.Dragger
                    accept="image/png,image/jpg,image/webp"
                    maxCount={1}
                    onChange={(file) => onFileChangeAvatar(file)}
                  >
                    <IonIcon
                      name="attach-outline"
                      style={{ fontSize: 20, color: '#EAB15A' }}
                    />
                  </Upload.Dragger>
                )}
              </Col>
              <Col span={20}>
                <Row gutter={[12, 12]}>
                  <Col span={24}>
                    <Input
                      value={nameCandidate}
                      placeholder="Input Candidate Name"
                      onChange={(e) => onChangeInfo('name', e.target.value)}
                    />
                  </Col>
                  <Col span={24}>
                    <Input
                      value={descCandidate}
                      placeholder="Input Candidate Description"
                      onChange={(e) =>
                        onChangeInfo('description', e.target.value)
                      }
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={24} style={{ textAlign: 'right' }}>
        <Button onClick={onNewCandidate} type="primary" size="large">
          Add
        </Button>
      </Col>

      {/* Upload File CSV */}
      <Col span={24}>
        <UploadFile />
      </Col>

      {/* Table Candidate */}
      <Col span={24}>
        <CandidateTable candidates={candidates} />
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
              disabled={Object.keys(candidates).length < 2}
              onClick={onNext}
              block
              type="primary"
              size="large"
            >
              Continue
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
