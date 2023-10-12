'use client'
import Papa from 'papaparse'
import { web3 } from '@coral-xyz/anchor'
import fileDownload from 'js-file-download'

import {
  Space,
  Typography,
  Upload,
  Row,
  Col,
  Button,
  Divider,
  Switch,
  Modal,
  notification,
} from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import { useCallback, useState } from 'react'

import type { UploadFile, UploadProps } from 'antd/es/upload/interface'
import { useProposalData } from '@/providers/proposal.provider'
import { getFileCSV } from '@/helpers/upload'
import { CandidateMetadata } from '@/hooks/atbash.hook'
import { isAddress } from 'atbash-protocol'
import { NotificationPlacement } from 'antd/es/notification/interface'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

const parse = (file: any): Promise<Array<[string]>> => {
  return new Promise((resolve, reject) => {
    return Papa.parse(file, {
      skipEmptyLines: true,
      complete: ({ data }) => {
        resolve(data as Array<[string]>)
      },
    })
  })
}

const UploadFile = () => {
  const [switchUpload, setSwitchUpload] = useState('none')
  const [api, contextHolder] = notification.useNotification()
  const { proposalData, setProposalData } = useProposalData()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const voters = proposalData.voters

  const openNotification = useCallback(
    (
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
    },
    [api],
  )

  const upload = useCallback(
    async (file: any) => {
      const votersFile = await parse(file)
      for (const [walletAddr] of votersFile) {
        if (!isAddress(walletAddr))
          return openNotification(
            'error',
            'Invalid wallet address',
            `${walletAddr} is not valid. Please enter the correct wallet address.`,
            'top',
          )

        voters.push(new web3.PublicKey(walletAddr))
        setProposalData({
          ...proposalData,
          voters: voters,
        })
      }
      setFileList([...fileList, file])
      return false
    },
    [fileList, openNotification, proposalData, setProposalData, voters],
  )

  const remove = useCallback(
    async (file: any) => {
      const votersFile = await parse(file)
      const newVoters = voters.filter((voterAddr) => {
        return votersFile.every((addr) => !addr.includes(voterAddr.toString()))
      })

      setProposalData({
        ...proposalData,
        voters: newVoters,
      })
      //remove file
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    [fileList, proposalData, setProposalData, voters],
  )

  const onChangeSwitch = (checked: boolean) => {
    if (checked) {
      setSwitchUpload('block')
    } else {
      setSwitchUpload('none')
    }
  }

  const onDownload = async () => {
    const file = (await getFileCSV('/exampleVoter.csv')) || ''
    fileDownload(file, 'exampleVoter.csv')
  }

  return (
    <Row gutter={[8, 8]} justify="end">
      {contextHolder}
      <Col span={24}>
        <Divider
          style={{ borderColor: '#fff', color: '#fff' }}
          orientation="right"
        >
          Upload CSV (Option Example.csv){' '}
          <Switch defaultChecked={false} onChange={onChangeSwitch} />
        </Divider>
      </Col>
      <Col style={{ display: switchUpload }}>
        <Button
          type="text"
          style={{
            color: '#fff',
            padding: 0,
            background: 'transparent',
            fontWeight: 700,
          }}
          icon={<IonIcon name="download-outline" />}
          onClick={onDownload}
        >
          Download sample
        </Button>
      </Col>
      <Col span={24} style={{ display: switchUpload }}>
        <Upload.Dragger
          accept=".csv,.txt"
          maxCount={1}
          className="upload-file"
          progress={{ strokeWidth: 2, showInfo: true }}
          onRemove={(file) => remove(file)}
          beforeUpload={(file) => upload(file)}
          fileList={fileList}
        >
          <Space direction="vertical" size={24} align="center">
            <IonIcon
              style={{ fontSize: 30, color: '#EAB15A' }}
              name="cloud-upload-outline"
            />
            <Space direction="vertical" size={4} align="center">
              <Typography.Text>Click or Drop file to upload</Typography.Text>
              <Typography.Text>
                The accepted file types are <code>.csv</code>, <code>.txt</code>
                .
              </Typography.Text>
            </Space>
          </Space>
        </Upload.Dragger>
      </Col>
    </Row>
  )
}

export default UploadFile
