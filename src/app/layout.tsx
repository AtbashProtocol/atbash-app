import type { Metadata } from 'next'
import Script from 'next/script'

import WalletProvider from '@/providers/wallet.provider'
import { Col, Row } from 'antd'
import { ProposalProvider } from '@/providers/proposal.provider'

import '@solana/wallet-adapter-react-ui/styles.css'

export const metadata: Metadata = {
  title: 'Atbash',
  description: 'The Zk Blockchain e-voting on Solana',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: '/logo.jpg',
    apple: '/logo.jpg',
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
              <Col xs={24} sm={20} md={16}>
                {children}
              </Col>
            </Row>
          </ProposalProvider>
        </WalletProvider>
      </body>
    </html>
  )
}
