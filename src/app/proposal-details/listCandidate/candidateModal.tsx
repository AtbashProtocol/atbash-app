'use client'
import { useState } from 'react'

import { Button, Image, Col, Row, Typography } from 'antd'
import { useVote } from '@/hooks/atbash.hook'

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

  const onVote = useVote(proposalAddress, candidateAddress)
  const onSubmit = async () => {
    try {
      setLoading(true)
      await onVote()
      console.log('Successfully Created Proposal')
    } catch (error) {
      console.error('Failed to Create Proposal', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title level={4}>Vote for Candidate</Typography.Title>
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
              }}
              src={avatar}
              preview={false}
            />
          </Col>
          <Col span={24} style={{ textAlign: 'center' }}>
            {name}
          </Col>
          <Col span={24} style={{ textAlign: 'center' }}>
            {description}
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[12, 24]} align="middle" justify="end">
          <Col>
            <Button onClick={hideModal} size="large">
              Close
            </Button>
          </Col>
          <Col>
            <Button
              loading={loading}
              onClick={onSubmit}
              type="primary"
              size="large"
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
