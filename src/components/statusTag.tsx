'use client'
import { useMemo } from 'react'

import { Tag } from 'antd'

type StatusTagProps = {
  isOwner?: boolean
  isVoted?: boolean
  isLive?: boolean
  isEnded?: boolean
  isGetResult?: boolean
  color?: string
}

export default function StatusTag({
  isOwner = false,
  isVoted = false,
  isLive = false,
  isEnded = false,
  isGetResult = false,
  color = 'black',
}: StatusTagProps) {
  const state = useMemo(() => {
    if (isOwner) return { text: 'Owner', color: '#7291e333' }
    if (isVoted) return { text: 'Voted', color: 'green' }
    if (isLive) return { text: 'Live', color: 'volcano' }
    if (isEnded) return { text: 'Ended', color: '#FF8460' }
    if (isGetResult) return { text: 'Need to Get Result', color: '#eab15a' }
    else return { text: 'Can Read', color: 'blue' }
  }, [isOwner, isVoted, isLive, isEnded, isGetResult])

  return (
    <Tag
      color={state.color}
      style={{
        textAlign: 'center',
        color: `${color}`,
        padding: '0 16px',
      }}
    >
      {state?.text}
    </Tag>
  )
}
