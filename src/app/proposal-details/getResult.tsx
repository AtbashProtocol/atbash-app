import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
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
  const { candidates, result: resultOnchain } =
    useProposalByAddress(proposalAddress)
  const [result, setResult] = useState<number[]>(
    Array(candidates.length).fill(0),
  )
  const [loading, setLoading] = useState(false)
  const max = useMemo(() => Math.max(...result), [result])

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

  useEffect(() => {
    if (resultOnchain.length) setResult(resultOnchain.map((e) => e.toNumber()))
  }, [resultOnchain])

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
                active={!!result[i] && result[i] === max}
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
  active = false,
}: {
  candidateAddress: string
  proposalAddress: string
  result?: number
  active?: boolean
}) => {
  const { proposalMetadata } = useMetadata(proposalAddress)
  const candidates = proposalMetadata?.candidateMetadata
  const { avatar, name } = candidates[candidateAddress]
  return (
    <Row
      justify="center"
      style={{
        position: 'relative',
        border: 'solid 1px',
        borderColor: active ? '#FFCD75' : 'transparent',
        borderRadius: 8,
      }}
    >
      <Col
        span={24}
        style={{
          background: active ? '#FFCD75' : '#ECEADD',
          padding: 8,
          borderRadius: '8px 8px 0px 0px',
          textAlign: 'center',
        }}
      >
        <Typography.Text
          strong
          style={{ textTransform: 'capitalize', color: 'black' }}
        >
          {name}
        </Typography.Text>
      </Col>
      <Col span={24}>
        <Image
          alt=""
          style={{
            aspectRatio: '4/3',
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
          background: active ? '#FFCD75' : '#FFFFFF',
          padding: 8,
          borderRadius: 8,
          textAlign: 'center',
          position: 'absolute',
          bottom: 8,
          width: '90%',
        }}
      >
        <Typography.Text
          strong
          style={{ textTransform: 'capitalize', color: 'black' }}
        >
          <CountUp start={0} end={result} duration={2} separator="," />
        </Typography.Text>
      </Col>
    </Row>
  )
}
