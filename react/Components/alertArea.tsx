import type { FC } from 'react'
import React from 'react'
import { Alert } from 'vtex.styleguide'
import { useIntl } from 'react-intl'

import { alert } from '../utils/definedMessages'
import { ShowAlertOptions } from '../utils/showAlertOptions'
import { useStore } from '../hooks/useStore'

const AlertArea: FC = () => {
  const intl = useIntl()

  const { showAlert, handleCloseAlert } = useStore()

  if (showAlert === ShowAlertOptions.alertSave) {
    return (
      <Alert type="success" onClose={handleCloseAlert}>
        {intl.formatMessage(alert.sucess)}
      </Alert>
    )
  }

  if (showAlert === ShowAlertOptions.alertCopySuccess) {
    return (
      <Alert type="success" onClose={handleCloseAlert}>
        {intl.formatMessage(alert.copy)}
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

  if (showAlert === ShowAlertOptions.alertCopyError) {
    return (
      <Alert type="error" onClose={handleCloseAlert}>
        {intl.formatMessage(alert.copyError)}
      </Alert>
    )
  }

  return null
}

export default AlertArea
