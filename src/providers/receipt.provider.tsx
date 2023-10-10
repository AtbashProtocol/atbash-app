'use client'
import { Fragment, ReactNode, useCallback, useEffect, useMemo } from 'react'
import { produce } from 'immer'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { useWallet } from '@solana/wallet-adapter-react'
import { ReceiptData } from 'atbash-protocol'

import { env } from '@/configs/env'
import { useAtbash } from '@/hooks/atbash.hook'

export type ReceiptStore = {
  receipts: Record<string, ReceiptData>
  upsertReceipt: (address: string, newReceipt: ReceiptData) => void
}

/**
 * Store
 */
export const useReceiptStore = create<ReceiptStore>()(
  devtools(
    (set) => ({
      receipts: {},
      upsertReceipt: (address: string, newReceipt: ReceiptData) =>
        set(
          produce<ReceiptStore>(({ receipts }) => {
            receipts[address] = newReceipt
          }),
          false,
          'upsertReceipt',
        ),
    }),
    {
      name: 'receipt',
      enabled: env === 'development',
    },
  ),
)

/**
 * Provider
 */
export function ReceiptProvider({ children }: { children: ReactNode }) {
  const upsertReceipt = useReceiptStore(({ upsertReceipt }) => upsertReceipt)
  const atbash = useAtbash()

  const fetchReceipts = useCallback(async () => {
    const receipts = await atbash.program.account.receipt.all()
    for (const { account, publicKey } of receipts) {
      const receiptData = account as ReceiptData
      upsertReceipt(publicKey.toBase58(), receiptData)
    }
  }, [atbash.program.account.receipt, upsertReceipt])

  useEffect(() => {
    fetchReceipts()
  }, [fetchReceipts])

  return <Fragment>{children}</Fragment>
}

/**
 * Hooks
 */

/**
 * Get all proposals
 * @returns Proposals list
 */
export const useReceipts = () => {
  const receipts = useReceiptStore(({ receipts }) => receipts)
  return receipts
}

/**
 * Get receipt data by proposal address
 * @returns receiptData
 */
export const useReceiptsByProposalAddress = (proposalAddress: string) => {
  const receipts = useReceipts()
  const { publicKey } = useWallet()

  const receipt = useMemo(() => {
    if (!publicKey) return
    for (const address in receipts) {
      const { authority, proposal } = receipts[address]
      if (
        publicKey.equals(authority) &&
        proposal.toBase58() === proposalAddress
      )
        return receipts[address]
    }
  }, [proposalAddress, publicKey, receipts])

  return receipt
}
