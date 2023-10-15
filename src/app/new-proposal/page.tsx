'use client'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Breadcrumb, Card, Col, Row, Steps, Button } from 'antd'
import ProposalInfo from './proposalInfo'
import CandidateInfo from './candidateInfo'
import VoterAccepted from './voterAccepted'
import Header from '@/components/header'
import IonIcon from '@sentre/antd-ionicon'

const PROPOSAL_INFO = 0
const CANDIDATE_INFO = 1
const VOTER_ACCEPTED = 2

export default function NewProposal() {
  const [step, setStep] = useState(PROPOSAL_INFO)
  const { push } = useRouter()

  const processInit = useMemo(() => {
    switch (step) {
      case PROPOSAL_INFO:
        return <ProposalInfo onNext={() => setStep(CANDIDATE_INFO)} />
      case CANDIDATE_INFO:
        return (
          <CandidateInfo
            onBack={() => setStep(PROPOSAL_INFO)}
            onNext={() => setStep(VOTER_ACCEPTED)}
          />
        )
      case VOTER_ACCEPTED:
        return <VoterAccepted onBack={() => setStep(CANDIDATE_INFO)} />
    }
  }, [step])

  return (
    <Row justify="center" align="middle">
      <Col span={24}>
        <Row className="banner" align="middle" justify="center">
          <Col xs={24} md={20} style={{ padding: 24 }}>
            <Row gutter={[0, 116]} align="middle" justify="center">
              <Col span={24}>
                <Header />
              </Col>
              <Col span={24} />
            </Row>
          </Col>
        </Row>
      </Col>
      <Col
        xs={24}
        md={20}
        style={{ padding: 24, position: 'absolute', top: '80px' }}
      >
        <Row gutter={[0, 16]} align="middle" justify="center">
          <Col span={16}>
            <Breadcrumb
              items={[
                {
                  href: '/',
                  title: (
                    <>
                      <IonIcon name="home-outline" />
                      <span>Campaign Dashboard</span>
                    </>
                  ),
                },
                {
                  title: (
                    <span style={{ color: '#EAB15A' }}>
                      Create New Campaign
                    </span>
                  ),
                },
              ]}
            />
          </Col>
          <Col span={16}>
            <Button
              onClick={() => push('/')}
              type="primary"
              icon={<IonIcon name="arrow-back-outline" />}
            >
              Back
            </Button>
          </Col>
          <Col span={16}>
            <Card className="card-info">
              <Row gutter={[32, 32]}>
                <Col span={24}>
                  <Steps size="small" current={step} direction="horizontal">
                    <Steps.Step title="Create Campaign" />
                    <Steps.Step title="Candidate Settings" />
                    <Steps.Step title="Voter Settings" />
                  </Steps>
                </Col>
                <Col span={24}>{processInit}</Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
