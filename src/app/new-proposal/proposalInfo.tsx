'use client'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import IonIcon from '@sentre/antd-ionicon'
import { UploadChangeParam } from 'antd/es/upload'

import {
  Button,
  Col,
  Input,
  Row,
  Typography,
  Space,
  Image,
  Upload,
  DatePicker,
} from 'antd'
import SpaceVertical from './spaceVertical'

import { InitProposalProps, ProposalMetadata } from '@/hooks/atbash.hook'
import { fileToBase64 } from '@/helpers/utils'
import { useGlobalProposal } from './page'

type ProposalInfoProp = {
  onNext: () => void
}

export default function ProposalInfo({ onNext }: ProposalInfoProp) {
  const { push } = useRouter()
  const [proposalData, setProposalData] = useGlobalProposal()

  const { description, title, image } = proposalData.proposalMetadata
  const { startTime, endTime } = proposalData

  const onChangeInfo = (name: keyof ProposalMetadata, value: string) => {
    const nextProposalMetadata = {
      ...proposalData.proposalMetadata,
      [name]: value,
    }
    return setProposalData({
      ...proposalData,
      proposalMetadata: nextProposalMetadata,
    })
  }

  const onChangeTime = (
    name: keyof InitProposalProps,
    value: string | number | null,
  ) => setProposalData({ ...proposalData, [name]: value })

  const onFileChangeProposal = (file: UploadChangeParam) => {
    const { fileList } = file
    const originFile = fileList[0].originFileObj as File
    fileToBase64(originFile, onChangePhotoProposal)
  }

  const onChangePhotoProposal = async (imgBase64: string) => {
    const nextProposalMetadata = {
      ...proposalData.proposalMetadata,
      ['image']: imgBase64,
    }
    return setProposalData({
      ...proposalData,
      proposalMetadata: nextProposalMetadata,
    })
  }

  return (
    <Row gutter={[20, 20]} justify="center" align="middle">
      <Col span={24}>
        <Typography.Title level={3}>Create Campaign</Typography.Title>
        <Typography.Text>
          Create a campaign name and description below
        </Typography.Text>
      </Col>
      {/* Title */}
      <Col span={24}>
        <SpaceVertical
          label={
            <Row justify="space-between">
              <Col>
                <Typography.Text>Title</Typography.Text>
              </Col>
              <Col>
                <Typography.Text>
                  <span style={{ color: title.length > 64 ? 'red' : '' }}>
                    {title.length}
                  </span>
                  /64 characters
                </Typography.Text>
              </Col>
            </Row>
          }
        >
          <Input
            placeholder="Input your project name"
            value={title}
            onChange={(e) => onChangeInfo('title', e.target.value)}
          />
        </SpaceVertical>
      </Col>

      {/* Description */}
      <Col span={24}>
        <SpaceVertical
          label={
            <Row justify="space-between">
              <Col>
                <Typography.Text>Description</Typography.Text>
              </Col>
              <Col>
                <Typography.Text>
                  <span
                    style={{ color: description.length > 300 ? 'red' : '' }}
                  >
                    {description.length}
                  </span>
                  /300 characters
                </Typography.Text>
              </Col>
            </Row>
          }
        >
          <Input.TextArea
            value={description}
            rows={4}
            placeholder="Summarize about your campaign..."
            onChange={(e) => onChangeInfo('description', e.target.value)}
          />
        </SpaceVertical>
      </Col>

      {/* Upload image */}
      <Col span={24}>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Typography.Text>Cover Photo</Typography.Text>
          </Col>
          <Col span={24} style={{ minHeight: 240 }}>
            {!image ? (
              <Upload.Dragger
                accept="image/png,image/jpg,image/webp"
                onChange={onFileChangeProposal}
              >
                <Space direction="vertical">
                  <IonIcon
                    style={{ fontSize: 40, color: '#EAB15A' }}
                    name="cloud-upload-outline"
                  />
                  <Space direction="vertical" size={0}>
                    <Typography.Text>
                      Click or drag image to upload
                    </Typography.Text>
                  </Space>
                </Space>
              </Upload.Dragger>
            ) : (
              <Image
                src={image}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  aspectRatio: '16/9',
                }}
              />
            )}
          </Col>
        </Row>
      </Col>

      {/* Timeline */}
      <Col span={12}>
        <SpaceVertical label={<Typography.Text>Start Time</Typography.Text>}>
          <DatePicker
            placeholder="Select time"
            suffixIcon={<IonIcon name="time-outline" />}
            className="date-option"
            onChange={(date) => onChangeTime('startTime', date?.valueOf() || 0)}
            clearIcon={null}
            value={startTime ? dayjs(startTime) : dayjs(Date.now())}
            showTime={{ showSecond: false }}
            placement="bottomRight"
            format={'MMM DD, YYYY HH:mm'}
          />
        </SpaceVertical>
      </Col>
      <Col span={12}>
        <SpaceVertical label={<Typography.Text>End Time</Typography.Text>}>
          <DatePicker
            placeholder="Select time"
            suffixIcon={<IonIcon name="time-outline" />}
            className="date-option"
            onChange={(date) => onChangeTime('endTime', date?.valueOf() || 0)}
            clearIcon={null}
            value={endTime ? dayjs(endTime) : dayjs(Date.now())}
            showTime={{ showSecond: false }}
            placement="bottomRight"
            format={'MMM DD, YYYY HH:mm'}
          />
        </SpaceVertical>
      </Col>
      <Col span={24} />

      {/* Action */}
      <Col span={24} style={{ marginTop: 12 }}>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Button onClick={() => push('/')} block size="large">
              Cancel
            </Button>
          </Col>
          <Col span={12}>
            <Button
              disabled={!(title && description && image)}
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
