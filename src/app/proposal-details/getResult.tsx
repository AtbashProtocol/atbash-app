import { Fragment, useCallback, useState } from 'react'
import CountUp from 'react-countup'

import IonIcon from '@sentre/antd-ionicon'
import { Button, Col, Image, Modal, Row, Typography, message } from 'antd'
import { useGetResult, useMetadata } from '@/hooks/atbash.hook'
import { useProposalByAddress } from '@/providers/proposal.provider'

const GetResult = ({ proposalAddress }: { proposalAddress: string }) => {
  const [open, setOpen] = useState(false)
  const { proposalMetadata } = useMetadata(proposalAddress) || {
    proposalMetadata: { description: '' },
  }
  const { candidates } = useProposalByAddress(proposalAddress)
  const [result, setResult] = useState(Array(candidates.length).fill(0))
  const [loading, setLoading] = useState(false)

  const getResult = useGetResult(proposalAddress)
  const onGetResult = useCallback(async () => {
    try {
      setLoading(true)
      const result = await getResult()
      setResult(result)
      message.success('Get result successfully!')
    } catch (er: any) {
      message.error(er.message)
    } finally {
      setLoading(false)
    }
  }, [getResult])

  return (
    <Fragment>
      <Button
        onClick={() => setOpen(true)}
        icon={<IonIcon name="leaf-outline" />}
        type="primary"
      >
        Get Result
      </Button>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width="100%"
        style={{ maxWidth: 900 }}
      >
        <Row gutter={[16, 16]}>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Typography.Title level={4}>Get result vote</Typography.Title>
          </Col>
          <Col span={24} style={{ textAlign: 'center', marginBottom: 16 }}>
            <Typography.Text style={{ color: '#fff' }}>
              {proposalMetadata.description}
            </Typography.Text>
          </Col>
          {candidates.map((address, i) => (
            <Col span={8} key={address.toBase58()}>
              <Candidate
                candidateAddress={address.toBase58()}
                proposalAddress={proposalAddress}
                result={result[i]}
              />
            </Col>
          ))}

          <Col span={12} style={{ marginTop: 24 }}>
            <Button block size="large" onClick={() => setOpen(false)}>
              Back
            </Button>
          </Col>
          <Col span={12} style={{ marginTop: 24 }}>
            <Button
              block
              type="primary"
              size="large"
              onClick={onGetResult}
              loading={loading}
            >
              Get result
            </Button>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default GetResult

const Candidate = ({
  candidateAddress,
  proposalAddress,
  result = 0,
}: {
  candidateAddress: string
  proposalAddress: string
  result?: number
}) => {
  const { proposalMetadata } = useMetadata(proposalAddress)
  const candidates = proposalMetadata?.candidateMetadata
  const { avatar, name } = candidates[candidateAddress]
  return (
    <Row justify="center" style={{ position: 'relative' }}>
      <Col
        span={24}
        style={{
          background: '#ECEADD',
          padding: 8,
          borderRadius: '8px 8px 0px 0px',
          textAlign: 'center',
        }}
      >
        <Typography.Text strong style={{ textTransform: 'capitalize' }}>
          {name}
        </Typography.Text>
      </Col>
      <Col span={24}>
        <Image
          alt=""
          style={{
            aspectRatio: '16/9',
            objectFit: 'cover',
            borderRadius: '0px 0px 8px 8px',
          }}
          src={avatar}
          preview={false}
          width="100%"
        />
      </Col>
      <Col
        span={24}
        style={{
          background: '#FFFFFF',
          padding: 8,
          borderRadius: 8,
          textAlign: 'center',
          position: 'absolute',
          bottom: 8,
          width: '90%',
        }}
      >
        <Typography.Text strong style={{ textTransform: 'capitalize' }}>
          <CountUp start={0} end={result} duration={2} separator="," />
        </Typography.Text>
      </Col>
    </Row>
  )
}
