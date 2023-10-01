'use client'
import { useState } from 'react'
import { web3 } from '@coral-xyz/anchor'
import { UploadChangeParam } from 'antd/es/upload'

import IonIcon from '@sentre/antd-ionicon'
import { Button, Col, Input, Row, Typography, Upload, Avatar } from 'antd'
import SpaceVertical from './spaceVertical'

import { useGlobalProposal } from './page'
import { fileToBase64 } from '@/helpers/utils'

type CandidateInfoProp = {
  onNext: () => void
  onBack: () => void
}

export default function CandidateInfo({ onNext, onBack }: CandidateInfoProp) {
  const [address, setAddress] = useState('')
  const [nameCandidate, setNameCandidate] = useState('')
  const [descCandidate, setDescCandidate] = useState('')
  const [avtCandidate, setAvtCandidate] = useState('')
  const [proposalData, setProposalData] = useGlobalProposal()

  const candidate = proposalData.proposalMetadata.candidateMetadata
  const candidatesAddr = proposalData.candidates

  const onChangeInfo = (keyCandidate: string, value: string) => {
    if (!address) return
    if (keyCandidate === 'name') setNameCandidate(value)
    if (keyCandidate === 'description') setDescCandidate(value)
  }

  const onFileChangeAvatar = (file: UploadChangeParam) => {
    const { fileList } = file
    const originFile = fileList[0].originFileObj as File
    fileToBase64(originFile, onChangeAvatar)
  }

  const onChangeAvatar = async (imgBase64: string) => {
    if (!address) return
    setAvtCandidate(imgBase64)
  }
  const onNewCandidate = () => {
    const nextProposalMetadata = {
      ...proposalData.proposalMetadata,
      candidateMetadata: {
        ...candidate,
        [address]: {
          ...candidate[address],
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
        <SpaceVertical
          label={
            <Row>
              <Col>
                <Typography.Text>Wallet Address Candidate</Typography.Text>
              </Col>
            </Row>
          }
        >
          <Input
            placeholder="Input Address Candidate"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </SpaceVertical>
      </Col>

      <Col span={24}>
        <SpaceVertical
          label={
            <Row>
              <Col>
                <Typography.Text>Fill in Candidate Info</Typography.Text>
              </Col>
            </Row>
          }
        >
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
                <Avatar size={50} src={avtCandidate} />
              ) : (
                <Upload
                  style={{ width: '100%' }}
                  accept="image/png,image/jpg,image/webp"
                  maxCount={1}
                  onChange={(file) => onFileChangeAvatar(file)}
                >
                  <Button
                    size="large"
                    block
                    type="dashed"
                    icon={<IonIcon name="attach-outline" />}
                  />
                </Upload>
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
        </SpaceVertical>
      </Col>
      <Col span={24} style={{ textAlign: 'right' }}>
        <Button onClick={onNewCandidate} type="primary" size="large">
          Add
        </Button>
      </Col>
      <Col span={24}>
        <Row gutter={[16, 8]} align="middle" style={{ padding: 8 }}>
          <Col span={4}>
            <Typography.Text>No.</Typography.Text>
          </Col>
          <Col span={4}>
            <Typography.Text>Avatar</Typography.Text>
          </Col>
          <Col span={4}>
            <Typography.Text>Name</Typography.Text>
          </Col>
          <Col span={12}>
            <Typography.Text>Description</Typography.Text>
          </Col>
        </Row>
      </Col>
      {Object.values(candidate).map(({ avatar, name, description }, index) => {
        return (
          <Col span={24} key={name}>
            <Row gutter={[16, 8]} align="middle" style={{ padding: 8 }}>
              <Col span={4}>
                <Typography.Text>{index + 1}.</Typography.Text>
              </Col>
              <Col span={4}>
                <Avatar size={40} src={avatar} />
              </Col>
              <Col span={4}>
                <Typography.Text>{name}</Typography.Text>
              </Col>
              <Col span={12}>
                <Typography.Text>{description}</Typography.Text>
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
            <Button onClick={onNext} block type="primary" size="large">
              Continue
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
