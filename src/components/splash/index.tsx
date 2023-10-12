'use client'
import Image from 'next/image'

import { useEffect, useState } from 'react'

import styles from './index.module.scss'

export type SplashProps = {
  open?: boolean
}

export default function Splash({ open }: SplashProps) {
  const [display, setDisplay] = useState<'block' | 'none'>('block')

  useEffect(() => {
    if (open) {
      setDisplay('block')

      const timeoutId = setTimeout(() => {
        setDisplay('none')
      }, 3500)
      return () => clearTimeout(timeoutId)
    } else {
      setDisplay('none')
    }
  }, [open])

  return (
    <div className={styles['splash-mark']} style={{ display }}>
      <div className={styles['splash-container']}>
        <Image width={180} height={50} alt="" src={'/brand.svg'} />
        <div className={styles['lds-ellipsis']}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}
