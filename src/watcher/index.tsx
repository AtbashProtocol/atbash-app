import React, { Fragment } from 'react'
import ProposalWatcher from './proposal.watcher'
import ReceiptWatcher from './receipt.watcher'

const Watcher = () => {
  return (
    <Fragment>
      <ProposalWatcher />
      <ReceiptWatcher />
    </Fragment>
  )
}

export default Watcher
