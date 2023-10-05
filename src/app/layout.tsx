import type { Metadata } from 'next'
import Script from 'next/script'

import { Col, Row } from 'antd'
import WalletProvider from '@/providers/wallet.provider'
import { ProposalProvider } from '@/providers/proposal.provider'

import '@solana/wallet-adapter-react-ui/styles.css'
import '@/styles/index.scss'

export const metadata: Metadata = {
  title: 'Atbash Protocol',
  description: 'The Zk Blockchain e-voting on Solana',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-G57JYZBDBP"
        />
      </head>
      <body>
        <WalletProvider>
          <ProposalProvider>
            <Row align="middle" justify="center">
              <Col span={24}>{children}</Col>
            </Row>
          </ProposalProvider>
        </WalletProvider>
      </body>
    </html>
  )
}
