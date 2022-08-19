import type { FC } from 'react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { Spinner, Button, Modal } from 'vtex.styleguide'

import { useStore } from '../hooks/useStore'
import HistoryTable from './historyTable'
import { historyMessages } from '../utils/definedMessages'

const History: FC = () => {
  const intl = useIntl()
  const [modalOpen, setModalOpen] = useState(false)
  const { loadingHistory } = useStore()

  const handleToggle = () => {
    setModalOpen(!modalOpen)
  }

  return (
    <span className="ml3" style={{ position: 'absolute' }}>
      {loadingHistory ? (
        <Spinner color="currentColor" size={20} />
      ) : (
        <Button
          variation="tertiary"
          size="small"
          onClick={() => handleToggle()}
        >
          {intl.formatMessage(historyMessages.openHistory)}
        </Button>
      )}
      <Modal
        centered
        isOpen={modalOpen}
        onClose={handleToggle}
        title={intl.formatMessage(historyMessages.openHistory)}
      >
        <HistoryTable />
      </Modal>
    </span>
  )
}

export default History
