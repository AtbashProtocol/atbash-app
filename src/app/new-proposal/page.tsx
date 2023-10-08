'use client'
import { useMemo, useState } from 'react'
import { createGlobalState } from 'react-use'

import { Card, Col, Row, Steps } from 'antd'
import ProposalInfo from './proposalInfo'
import CandidateInfo from './candidateInfo'
import VoterAccepted from './voterAccepted'

import { ProposalMetadata, InitProposalProps } from '@/hooks/atbash.hook'

export enum InitProposalStep {
  proposalInfo,
  candidateInfo,
  voterAccepted,
}

const DEFAULT_PROPOSAL_METADATA: ProposalMetadata = {
  title: '',
  description: '',
  image: '',
  candidateMetadata: {},
}

const DEFAULT_INIT_PROPOSAL_PROPS: InitProposalProps = {
  startTime: Date.now(), //now
  endTime: Date.now() + 3 * (24 * 60 * 60 * 1000), // Add more 3 days
  voters: [],
  candidates: [],
  proposalMetadata: DEFAULT_PROPOSAL_METADATA,
}

export const useGlobalProposal = createGlobalState<InitProposalProps>(
  DEFAULT_INIT_PROPOSAL_PROPS,
)

const PROPOSAL_INFO = 0
const CANDIDATE_INFO = 1
const VOTER_ACCEPTED = 2

export default function NewProposal() {
  const [step, setStep] = useState(PROPOSAL_INFO)

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
    <Row justify="center">
      <Col xs={24} sm={20} md={18} lg={16}>
        <Card style={{ marginBottom: 24 }}>
          <Row gutter={[32, 32]}>
            <Col span={24}>
              <Steps size="small" current={step} direction="horizontal">
                <Steps.Step title="Proposal Info" />
                <Steps.Step title="Candidate Info" />
                <Steps.Step title="Voters Accepted" />
              </Steps>
            </Col>
            <Col span={24}>{processInit}</Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}
