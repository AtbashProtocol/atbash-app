import { Col, Row, Image, Typography, Divider } from 'antd'
import Header from '@/components/header'

export default function Banner() {
  return (
    <Row className="banner" align="middle" justify="center">
      <Col sm={24} lg={22} style={{ position: 'relative', padding: '24px 0' }}>
        <Row gutter={[0, 36]} align="middle" justify="center">
          <Col span={24}>
            <Header />
          </Col>
          <Col span={24}>
            <Row gutter={[0, 24]} align="middle" justify="center">
              <Col span={20} style={{ textAlign: 'center' }}>
                <Typography.Title
                  style={{
                    color: '#FFCD75',
                    fontFamily: 'Cinzel',
                    fontWeight: '700',
                    fontFeatureSettings: 'clig off liga off',
                    textTransform: 'uppercase',
                  }}
                >
                  Cast Your Vote, Guard Your Privacy
                </Typography.Title>
              </Col>
              <Col xs={16} lg={12} xl={20} style={{ textAlign: 'center' }}>
                <Typography.Text
                  style={{
                    color: '#FFCD75',
                    fontSize: '1.3rem',
                  }}
                >
                  The Future of Privacy E-Voting
                </Typography.Text>
              </Col>
            </Row>
          </Col>
          <Col span={24} />
        </Row>
      </Col>
    </Row>
  )
}
