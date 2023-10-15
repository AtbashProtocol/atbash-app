'use client'
import { useMemo } from 'react'

import { Tag, Typography } from 'antd'

type StatusTagProps = {
  isOwner?: boolean
  isVoted?: boolean
  isLive?: boolean
  isGetResult?: boolean
  color?: string
}

export default function StatusTag({
  isOwner = false,
  isVoted = false,
  isLive = false,
  isGetResult = false,
  color = 'black',
}: StatusTagProps) {
  const state = useMemo(() => {
    if (isOwner) return { text: 'Owner', color: '#D4D8DE' }
    if (isVoted) return { text: 'Voted', color: '#7291E3' }
    if (isLive) return { text: 'Live', color: '#69CFBD' }
    if (isGetResult) return { text: 'Needs Counting', color: '#FF8460' }
    else return { text: 'Can Read', color: 'red' }
  }, [isOwner, isVoted, isLive, isGetResult])

  return (
    <Tag
      color={state.color}
      style={{
        textAlign: 'center',
        color: `${color}`,
        padding: '0 16px',
      }}
    >
      <Typography.Text style={{ color: 'black' }}>{state.text}</Typography.Text>
    </Tag>
  )
}
