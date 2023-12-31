import { useCallback, useMemo } from 'react'
import { decode, encode } from 'bs58'
import { web3 } from '@coral-xyz/anchor'
import useSWR from 'swr'
import axios from 'axios'
import Atbash, { MerkleDistributor } from 'atbash-protocol'
import { useWallet } from '@solana/wallet-adapter-react'

import solConfig from '@/configs/sol.config'
import { useAnchorProvider } from '@/providers/wallet.provider'
import { toFilename, uploadFileToSupabase } from '@/helpers/upload'
import { useProposalByAddress } from '@/providers/proposal.provider'

export const useAtbash = () => {
  const provider = useAnchorProvider()
  provider.opts.skipPreflight = true

  const atbash = useMemo(
    () => new Atbash(provider, solConfig.atbashAddress),
    [provider],
  )

  return atbash
}

type WalletAddress = string

export type CandidateMetadata = {
  name: string
  avatar: string
  description: string
}

export type ProposalMetadata = {
  title: string
  description: string
  image: string
  candidateMetadata: Record<WalletAddress, CandidateMetadata>
}

export type InitProposalProps = {
  startTime: number
  endTime: number
  voters: web3.PublicKey[]
  candidates: web3.PublicKey[]
  proposalMetadata: ProposalMetadata
}

export const useMetadata = (proposalAddress: string) => {
  const { metadata } = useProposalByAddress(proposalAddress)

  const fetcher = useCallback(async ([metadata]: [number[]]) => {
    let cid = encode(Buffer.from(metadata))
    const fileName = toFilename(cid)
    const url =
      'https://hnreqcvgchtokkqynbli.supabase.co/storage/v1/object/public/atbash/public/' +
      fileName
    const { data } = await axios.get(url)
    return data
  }, [])

  const { data } = useSWR([metadata, 'metadata'], fetcher)

  return data
}

export const useInitProposal = (props: InitProposalProps) => {
  const atbash = useAtbash()
  const initProposal = useCallback(async () => {
    const { startTime, endTime, candidates, voters, proposalMetadata } = props
    const merkleDistributor = atbash.getMerkleDistributor(voters)
    const merkleRoot = merkleDistributor.toBuffer()
    const blob = [
      new Blob([JSON.stringify({ proposalMetadata, merkleRoot }, null, 2)], {
        type: 'application/json',
      }),
    ]
    const file = new File(blob, 'metadata.txt')
    const cid = await uploadFileToSupabase(file)
    const { txId } = await atbash.initializeProposal({
      candidates,
      voters,
      endTime: endTime / 1000,
      startTime: startTime / 1000,
      metadata: decode(cid),
    })
    return txId
  }, [atbash, props])

  return initProposal
}

export const useVote = (proposalAddress: string, voteFor: string) => {
  const metadata = useMetadata(proposalAddress)
  const { commitment } = useProposalByAddress(proposalAddress)
  const atbash = useAtbash()
  const { publicKey } = useWallet()

  const onVote = useCallback(async () => {
    const merkleRoot = metadata.merkleRoot
    const merkle = MerkleDistributor.fromBuffer(Buffer.from(merkleRoot.data))
    const voter = merkle.voters.find(
      ({ authority }) => publicKey && authority.equals(publicKey),
    )
    if (!voter) throw new Error("You don't have permission to vote!")
    const proof = merkle.deriveProof(voter)
    const { txId } = await atbash.vote({
      data: voter,
      proof,
      proposalAddress,
      votFor: new web3.PublicKey(voteFor),
      commitment: commitment.toNumber(),
    })
    return txId
  }, [
    atbash,
    commitment,
    metadata.merkleRoot,
    proposalAddress,
    publicKey,
    voteFor,
  ])

  return onVote
}

export const useGetResult = (proposalAddress: string) => {
  const atbash = useAtbash()
  const metadata = useMetadata(proposalAddress)
  const provider = useAnchorProvider()

  const getResult = useCallback(async () => {
    if (!metadata) return []
    const merkleRoot = metadata.merkleRoot
    const merkle = MerkleDistributor.fromBuffer(Buffer.from(merkleRoot.data))

    const { result, tx } = await atbash.getResult({
      proposalAddress,
      totalVoter: merkle.voters.length,
    })

    await provider.sendAndConfirm(tx)

    return result
  }, [atbash, metadata, proposalAddress, provider])

  return getResult
}

export const useWinner = (proposalAddress: string) => {
  const proposal = useProposalByAddress(proposalAddress)

  const winner = useMemo(() => {
    if (!proposal.result.length) return
    const num = proposal.result.map((e) => e.toNumber())
    const max = Math.max(...num)
    const i = num.findIndex((e) => e === max)
    return proposal.candidates[i].toBase58()
  }, [proposal.candidates, proposal.result])

  return winner
}
