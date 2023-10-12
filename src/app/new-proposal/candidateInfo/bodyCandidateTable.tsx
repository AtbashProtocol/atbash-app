import { useState } from 'react'

import {
  Col,
  Row,
  Space,
  Typography,
  Tooltip,
  Checkbox,
  Button,
  Input,
  Avatar,
  Upload,
} from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import { UploadChangeParam } from 'antd/es/upload'
import { fileToBase64 } from '@/helpers/utils'
import { useProposalData } from '@/providers/proposal.provider'
import AvatarUploaded from './avatarUploaded'

type BodyCandidateTableProps = {
  name: string
  avatar: string
  description: string
  address: string
  index: number
}

export default function BodyCandidateTable({
  name,
  avatar,
  description,
  index,
  address,
}: BodyCandidateTableProps) {
  const [isEdit, setIsEdit] = useState(false)
  const [nameCandidate, setNameCandidate] = useState(name)
  const [descCandidate, setDescCandidate] = useState(description)
  const [avtCandidate, setAvtCandidate] = useState(avatar)
  const { proposalData, setProposalData } = useProposalData()

  const candidates = proposalData.proposalMetadata.candidateMetadata
  const candidatesAddr = proposalData.candidates

  const onFileChangeAvatar = (file: UploadChangeParam) => {
    const { fileList } = file
    const originFile = fileList[0].originFileObj as File
    fileToBase64(originFile, onChangeAvatar)
  }

  const onChangeAvatar = async (imgBase64: string) => {
    setAvtCandidate(imgBase64)
  }

  const onChangeInfo = (keyCandidate: string, value: string) => {
    if (keyCandidate === 'name') setNameCandidate(value)
    else setDescCandidate(value)
  }

  const onSave = () => {
    const updateProposalMetadata = {
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
    setProposalData({
      ...proposalData,
      proposalMetadata: updateProposalMetadata,
    })
    return setIsEdit(false)
  }

  const onDelete = () => {
    const deletedCandidateInfos = { ...candidates }
    delete deletedCandidateInfos[address]

    const newCandidates = candidatesAddr.filter((addr) => {
      return addr.toString() !== address
    })

    return setProposalData({
      ...proposalData,
      candidates: newCandidates,
      proposalMetadata: {
        ...proposalData.proposalMetadata,
        candidateMetadata: deletedCandidateInfos,
      },
    })
  }

  return (
    <Row gutter={[16, 8]} align="middle" className="table-item">
      <Col span={2}>
        <Typography.Text>#{index + 1}</Typography.Text>
      </Col>
      <Col span={4}>
        {isEdit ? (
          avtCandidate ? (
            <AvatarUploaded onRemove={() => setAvtCandidate('')}>
              <Avatar size={40} src={avtCandidate} />
            </AvatarUploaded>
          ) : (
            <Upload.Dragger
              className="avatar-uploader"
              accept="image/png,image/jpg,image/webp"
              maxCount={1}
              onChange={(file) => onFileChangeAvatar(file)}
            >
              <IonIcon
                name="attach-outline"
                style={{ fontSize: 20, color: '#EAB15A' }}
              />
            </Upload.Dragger>
          )
        ) : (
          <Avatar size={40} src={avtCandidate} />
        )}
      </Col>
      <Col span={6}>
        {isEdit ? (
          <Input
            value={nameCandidate}
            name="name"
            className="recipient-input"
            autoComplete="off"
            onChange={(e) => onChangeInfo('name', e.target.value)}
          />
        ) : (
          <Typography.Text>{name}</Typography.Text>
        )}
      </Col>

      <Col span={8}>
        {isEdit ? (
          <Input
            value={descCandidate}
            name="name"
            className="recipient-input"
            autoComplete="off"
            onChange={(e) => onChangeInfo('desc', e.target.value)}
          />
        ) : (
          <Typography.Text>{description}</Typography.Text>
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
