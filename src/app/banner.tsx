import { Col, Row, Image, Typography, Divider } from 'antd'
import Header from '@/components/header'

export default function Banner() {
  return (
    <Row className="banner" align="middle" justify="center">
      <Col xs={24} md={20} style={{ position: 'relative', padding: 24 }}>
        <Row gutter={[0, 72]} align="middle" justify="center">
          <Col span={24}>
            <Header />
          </Col>
          <Col span={20} style={{ textAlign: 'center' }}>
            <Typography.Title style={{ color: '#EAB15A' }}>
              Cast Your Vote, Guard Your Privacy
            </Typography.Title>
            <Divider dashed style={{ borderColor: '#EAB15A' }} />
            <Row gutter={[4, 4]} align="middle" justify="center">
              <Col>
                <Image preview={false} alt="" src="/icon-pyramid.svg" />
              </Col>
              <Col xs={16} lg={12} xl={8}>
                <Row gutter={[8, 8]}>
                  <Col span={24}>
                    <Typography.Text
                      style={{ color: '#EAB15A', fontSize: '1.2rem' }}
                    >
                      The Future of Privacy E-Voting
                    </Typography.Text>
                  </Col>
                  <Col span={24}>
                    <Typography.Text
                      style={{ color: '#EAB15A', fontSize: '1.2rem' }}
                    >
                      “Using ZK Proof technology”
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Image alt="" src="/icon-pyramid.svg" preview={false} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
