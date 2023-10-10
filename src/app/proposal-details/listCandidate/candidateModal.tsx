'use client'
import { Fragment, useState } from 'react'

import { Button, Image, Col, Row, Typography, message } from 'antd'
import { useVote } from '@/hooks/atbash.hook'
import { useReceiptsByProposalAddress } from '@/providers/receipt.provider'

type CandidateModalProps = {
  avatar: string
  name: string
  description: string
  proposalAddress: string
  candidateAddress: string
  hideModal: () => void
}
export default function CandidateModal({
  avatar,
  name,
  description,
  proposalAddress,
  candidateAddress,
  hideModal,
}: CandidateModalProps) {
  const [loading, setLoading] = useState(false)
  const receipt = useReceiptsByProposalAddress(proposalAddress)

  const onVote = useVote(proposalAddress, candidateAddress)
  const onSubmit = async () => {
    try {
      setLoading(true)
      await onVote()
      message.success(`You voted for ${name} successfully`)
      hideModal()
    } catch (er: any) {
      message.error(er.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title level={4}>
          Vote for Candidate: {name}
        </Typography.Title>
      </Col>
      <Col span={24}>
        <Row gutter={[12, 12]} justify="center" align="middle">
          <Col span={24} style={{ textAlign: 'center' }}>
            <Image
              alt=""
              style={{
                aspectRatio: '16/9',
                objectFit: 'cover',
                width: '200px',
                height: '200px',
                borderRadius: 8,
              }}
              src={avatar}
              preview={false}
            />
          </Col>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Typography.Title level={5}>{name}</Typography.Title>
          </Col>
          <Col span={24} style={{ textAlign: 'center' }}>
            {description}
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[12, 24]} align="middle" justify="end">
          <Col span={12}>
            <Button block onClick={hideModal} size="large">
              Close
            </Button>
          </Col>
          <Col span={12}>
            <Button
              loading={loading}
              onClick={onSubmit}
              type="primary"
              size="large"
              block
              disabled={!!receipt}
            >
              {!!receipt ? 'Your already vote' : 'Submit'}
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
