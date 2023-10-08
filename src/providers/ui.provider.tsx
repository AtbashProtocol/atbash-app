'use client'
import { ReactNode } from 'react'

import { ConfigProvider } from 'antd'

import { config } from '@/styles/theme'

export default function UiProvider({ children }: { children: ReactNode }) {
  return <ConfigProvider theme={config}>{children}</ConfigProvider>
}
