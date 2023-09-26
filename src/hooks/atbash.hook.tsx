import { useMemo } from 'react'
import Atbash from 'atbash-protocol'

import solConfig from '@/configs/sol.config'
import { useAnchorProvider } from '@/providers/wallet.provider'

export const useAtbash = () => {
  const provider = useAnchorProvider()

  const atbash = useMemo(
    () => new Atbash(provider, solConfig.atbashAddress),
    [provider],
  )

  return atbash
}
