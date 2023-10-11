'use client'
import Papa from 'papaparse'

import {
  Space,
  Typography,
  Upload,
  Row,
  Col,
  Button,
  Divider,
  Switch,
} from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import { useCallback, useState } from 'react'
import { useGlobalProposal } from '../page'
import { web3 } from '@coral-xyz/anchor'
import type { UploadFile, UploadProps } from 'antd/es/upload/interface'

const parse = (file: any): Promise<Array<[string, string, string]>> => {
  return new Promise((resolve, reject) => {
    return Papa.parse(file, {
      skipEmptyLines: true,
      complete: ({ data }) => {
        resolve(data as Array<[string, string, string]>)
      },
    })
  })
}

const UploadFile = () => {
  const [proposalData, setProposalData] = useGlobalProposal()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const candidates = proposalData.proposalMetadata.candidateMetadata
  const candidatesAddr = proposalData.candidates
  const upload = useCallback(
    async (file: any) => {
      const candidatesFile = await parse(file)
      //   if (name === undefined || description === undefined ) return

      for (const [name, description, walletAddr] of candidatesFile) {
        const nextProposalMetadata = {
          ...proposalData.proposalMetadata,
          candidateMetadata: {
            ...candidates,
            [walletAddr]: {
              ...candidates[walletAddr],
              name: name,
              description: description,
              avatar: '',
            },
          },
        }
        candidatesAddr.push(new web3.PublicKey(walletAddr))
        setProposalData({
          ...proposalData,
          proposalMetadata: nextProposalMetadata,
        })
      }
      setFileList([...fileList, file])
      return false
    },
    [candidates, candidatesAddr, fileList, proposalData, setProposalData],
  )
  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file])

      return false
    },
    fileList,
  }

  return (
    <Row gutter={[8, 8]} justify="end">
      <Col span={24}>
        <Divider
          style={{ borderColor: '#fff', color: '#fff' }}
          orientation="right"
        >
          Upload CSV (Option Example.cvs) <Switch defaultChecked />
        </Divider>
      </Col>
      <Col span={24}>
        <Upload.Dragger
          accept=".csv,.txt"
          maxCount={1}
          className="upload-file"
          progress={{ strokeWidth: 2, showInfo: true }}
          {...props}
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
      <Col>
        <Button
          type="text"
          style={{
            color: '#fff',
            padding: 0,
            background: 'transparent',
            fontWeight: 700,
          }}
          icon={<IonIcon name="download-outline" />}
          // onClick={onDownload}
        >
          Download sample
        </Button>
      </Col>
    </Row>
  )
}

export default UploadFile
