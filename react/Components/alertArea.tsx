import type { FC } from 'react'
import React from 'react'
import { Alert } from 'vtex.styleguide'
import { useIntl } from 'react-intl'

import { alert } from '../utils/definedMessages'
import { ShowAlertOptions } from '../utils/showAlertOptions'
import { useStore } from '../hooks/useStore'

const AlertArea: FC = () => {
  const intl = useIntl()

  const { setShowAlert, showAlert } = useStore()

  const handleCloseAlert = () => {
    setShowAlert(ShowAlertOptions.notShow)
  }

  if (showAlert === ShowAlertOptions.alertSave) {
    return (
      <Alert type="success" onClose={handleCloseAlert}>
        {intl.formatMessage(alert.sucess)}
      </Alert>
    )
  }

  if (showAlert === ShowAlertOptions.alertError) {
    return (
      <Alert type="error" onClose={handleCloseAlert}>
        {intl.formatMessage(alert.error)}
      </Alert>
    )
  }

  return null
}

export default AlertArea
