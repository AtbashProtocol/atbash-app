'use client'
import { useCallback, useMemo, useState } from 'react'
import copy from 'copy-to-clipboard'
import { MerkleDistributor } from 'atbash-protocol'
import { useWallet } from '@solana/wallet-adapter-react'

import CandidateModal from './candidateModal'
import IonIcon from '@sentre/antd-ionicon'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Col, Row, Image, Card, Typography, Button, Modal, Tooltip } from 'antd'

import { asyncWait, shortenAddress } from '@/helpers/utils'
import { useMetadata } from '@/hooks/atbash.hook'

type CandidateCardProps = {
  candidateAddress: string
  proposalAddress: string
}

export default function CandidateCard({
  candidateAddress,
  proposalAddress,
}: CandidateCardProps) {
  const [visible, setVisible] = useState(false)
  const [copied, setCopied] = useState(false)

  // const { publicKey } = useWallet()
  const { proposalMetadata } = useMetadata(proposalAddress)
  const candidates = proposalMetadata?.candidateMetadata
  const { avatar, name, description } = candidates[candidateAddress]

  // const voter = useMemo(() => {
  //   if(!merkleRoot) return
  //   const merkle = MerkleDistributor.fromBuffer(Buffer.from(merkleRoot))
  //   const voter = merkle.voters.find(
  //     ({ authority }) => publicKey && authority.equals(publicKey),
  //   )
  //   return voter
  // }, [merkleRoot, publicKey])

  const onCopy = useCallback(async () => {
    copy(candidateAddress)
    setCopied(true)
    await asyncWait(1500)
    return setCopied(false)
  }, [candidateAddress])

  return (
    <Row className="candidate-card">
      <Col span={24} className="candidate-image">
        <Image
          alt=""
          style={{ aspectRatio: '16/9', objectFit: 'cover' }}
          src={avatar}
          preview={false}
        />
      </Col>
      <Col span={24} className="candidate-header">
        <Row align="middle" justify="space-between">
          <Col>
            <Typography.Title level={4}>{name}</Typography.Title>
          </Col>
          <Col>
            <Image
              className="icon-hand"
              alt=""
              src="/icon-hand.svg"
              preview={false}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24} className="candidate-card-body">
        <Card>
          <Row gutter={[16, 16]} align="middle">
            <Col span={24}>
              <Row justify="space-between">
                <Col>
                  <Typography.Title level={4}>{name}</Typography.Title>
                </Col>
                <Col>
                  <Button type="primary" onClick={() => setVisible(true)}>
                    Vote Now
                  </Button>
                  <Modal
                    open={visible}
                    onCancel={() => setVisible(false)}
                    footer={null}
                    destroyOnClose
                    centered
                  >
                    <CandidateModal
                      avatar={avatar}
                      name={name}
                      description={description}
                      proposalAddress={proposalAddress}
                      candidateAddress={candidateAddress}
                      hideModal={() => setVisible(false)}
                    />
                  </Modal>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              {shortenAddress(candidateAddress)}

              <Tooltip title="Copied" open={copied}>
                <CopyToClipboard text={candidateAddress}>
                  <Button
                    type="text"
                    style={{ color: 'white' }}
                    icon={<IonIcon name="copy-outline" />}
                    onClick={onCopy}
                  />
                </CopyToClipboard>
              </Tooltip>
            </Col>
            <Col span={24}>{description}</Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}
