import type { FC } from 'react'
import React, { useContext } from 'react'
import { Alert } from 'vtex.styleguide'
import { useIntl } from 'react-intl'

import { alert } from '../utils/definedMessages'
import Context from '../Context/context'
import { ShowAlertOptions } from '../utils/showAlertOptions'

const AlertArea: FC = () => {
  const intl = useIntl()

  const provider = useContext(Context)

  const handleCloseAlert = () => {
    provider.setShowAlert(ShowAlertOptions.notShow)
  }

  if (provider.showAlert === ShowAlertOptions.alertSave) {
    return (
      <Alert type="success" onClose={handleCloseAlert}>
        {intl.formatMessage(alert.sucess)}
      </Alert>
    )
  }

  if (provider.showAlert === ShowAlertOptions.alertError) {
    return (
      <Alert type="error" onClose={handleCloseAlert}>
        {intl.formatMessage(alert.error)}
      </Alert>
    )
  }

  return null
}

export default AlertArea
