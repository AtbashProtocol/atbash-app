'use client'
import { useSearchParams } from 'next/navigation'

import { Breadcrumb, Col, Row } from 'antd'
import Header from '@/components/header'
import IonIcon from '@sentre/antd-ionicon'
import CampaignInfo from './proposalInfo'
import ListCandidate from './listCandidate'

export default function ProposalDetails() {
  const searchParams = useSearchParams()
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

      <Col xs={24} md={20} style={{ padding: 24, top: -120 }}>
        <Row gutter={[0, 12]}>
          <Col span={24}>
            <Breadcrumb
              items={[
                {
                  href: '/',
                  title: (
                    <>
                      <IonIcon name="home-outline" />
                      <span>Proposal Dashboard</span>
                    </>
                  ),
                },
                {
                  title: (
                    <span style={{ color: '#EAB15A' }}>Proposal Details</span>
                  ),
                },
              ]}
            />
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
