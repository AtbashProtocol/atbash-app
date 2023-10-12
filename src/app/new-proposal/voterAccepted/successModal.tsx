import { Button, Col, Row, Typography, Image } from 'antd'

type SuccessModalProps = {
  hideModal: () => void
}
const SuccessModal = ({ hideModal }: SuccessModalProps) => {
  return (
    <Row gutter={[12, 12]} justify={'center'} align={'middle'}>
      <Col span={24} style={{ textAlign: 'center' }}>
        <Image
          preview={false}
          alt=""
          src="/success.svg"
          width={150}
          height={170}
        />
      </Col>
      <Col span={24} style={{ textAlign: 'center' }}>
        <Typography.Title level={4} style={{ color: '#fff' }}>
          Hurray! You create campaign successfully 🎉
        </Typography.Title>
      </Col>
      <Col span={24}>
        <Button block type="primary" size="large" onClick={hideModal}>
          See your campaign
        </Button>
      </Col>
    </Row>
  )
}

export default SuccessModal
