'use client'
import { useRouter, useSearchParams } from 'next/navigation'

import { Breadcrumb, Button, Col, Row } from 'antd'
import Header from '@/components/header'
import IonIcon from '@sentre/antd-ionicon'
import CampaignInfo from './proposalInfo'
import ListCandidate from './listCandidate'

export default function ProposalDetails() {
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const proposalAddress = searchParams.get('proposalAddress') || ''

  return (
    <Row gutter={[0, 12]} justify="center">
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
        <Row gutter={[0, 12]}>
          <Col span={24}>
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
                    <span style={{ color: '#EAB15A' }}>Campaign Details</span>
                  ),
                },
              ]}
            />
          </Col>
          <Col span={24}>
            <Button
              onClick={() => push('/')}
              type="primary"
              icon={<IonIcon name="arrow-back-outline" />}
            >
              Back
            </Button>
          </Col>
          <Col span={24}>
            <CampaignInfo proposalAddress={proposalAddress} />
          </Col>
          <Col span={24}>
            <ListCandidate proposalAddress={proposalAddress} />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
