import { Button, Col, Modal, Row, Steps, Typography, Image } from 'antd'
import { Fragment, useState } from 'react'

const Guideline = () => {
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <Button onClick={() => setOpen(true)} size="large">
        How to vote
      </Button>
      <Modal open={open} onCancel={() => setOpen(false)} footer={null}>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Typography.Title level={4}>How to vote</Typography.Title>
          </Col>
          <Col span={24}>
            <Typography.Text style={{ color: '#fff' }}>
              Learn how to cast your privacy-preserving vote
            </Typography.Text>
          </Col>
          <Col span={12}>
            <Steps
              direction="vertical"
              items={[
                {
                  title: 'Select campaign',
                  description: 'Choose the campaign you want to vote for',
                },
                {
                  title: 'Choose Candidate',
                  description:
                    'Pick your favorite candidate from the campaign list',
                },
                {
                  title: 'Submit',
                  description:
                    'Click on the “Vote” button to submit your choice',
                },
              ]}
            />
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            <Image
              preview={false}
              alt=""
              src="/hand.svg"
              width={150}
              height={170}
            />
          </Col>
          <Col span={24}>
            <Button
              block
              type="primary"
              size="large"
              onClick={() => setOpen(false)}
            >
              Start vote
            </Button>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default Guideline
