import {
  CSSProperties,
  Fragment,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import moment from 'moment'

import { Space, Tag, Typography } from 'antd'

type TimeTagProps = { children?: ReactNode; style?: CSSProperties }
const TimeTag = ({ children, style }: TimeTagProps) => {
  return (
    <Tag
      style={{
        background: '#EAB15A',
        border: 'none',
        borderRadius: 4,
        marginRight: 0,
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}

type TimeCountDownProps = { endTime: number }
const TimeCountDown = ({ endTime }: TimeCountDownProps) => {
  const startTime = Math.floor(Date.now() / 1000)
  const currentTime = Date.now() / 1000
  const duration = moment.duration(endTime - startTime, 'seconds')

  const [countDown, setCountDown] = useState({
    days: Math.floor(duration.asDays()),
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds(),
  })

  const updateCountDown = useCallback(async () => {
    if (!endTime || endTime < currentTime) return

    const duration = moment.duration(endTime - startTime, 'seconds')
    const days = Math.floor(duration.asDays())
    const hours = duration.hours()
    const minutes = duration.minutes()
    const seconds = duration.seconds()
    setCountDown({ days, hours, minutes, seconds })
  }, [endTime, currentTime, startTime])

  useEffect(() => {
    const interval = setInterval(() => updateCountDown(), 1000)
    return () => clearInterval(interval)
  }, [updateCountDown])

  if (endTime < currentTime)
    return (
      <TimeTag>
        <Typography.Text style={{ color: 'black' }}>Ended</Typography.Text>
      </TimeTag>
    )

  return (
    <Space size={4}>
      {!!countDown.days && (
        <Fragment>
          <TimeTag>
            <Typography.Text style={{ color: 'black' }}>
              {countDown.days}d
            </Typography.Text>
          </TimeTag>
          :
        </Fragment>
      )}
      <TimeTag>
        <Typography.Text style={{ color: 'black' }}>
          {countDown.hours}h
        </Typography.Text>
      </TimeTag>
      :
      <TimeTag>
        <Typography.Text style={{ color: 'black' }}>
          {countDown.minutes}m
        </Typography.Text>
      </TimeTag>
      {!countDown.days && (
        <Fragment>
          :
          <TimeTag>
            <Typography.Text style={{ color: 'black' }}>
              {countDown.seconds}s
            </Typography.Text>
          </TimeTag>
        </Fragment>
      )}
    </Space>
  )
}

export default TimeCountDown
