import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import success from '../assets/toast-success.svg'
import error from '../assets/toast-error.svg'
import { useStore } from '../hooks/useStore'
import '../styles.global.css'
import { ShowAlertOptions } from '../utils/showAlertOptions'
import { toast } from '../utils/definedMessages'

const ToastArea = () => {
  const DEFAULT_ALERT_AUTOCLOSE_TIMEOUT_MS = 3000

  const intl = useIntl()

  const { showAlert, setShowAlert, rescue, code } = useStore()

  function changeValueShowAlert() {
    if (showAlert !== ShowAlertOptions.notShow) {
      setShowAlert(ShowAlertOptions.notShow)
    }
  }

  useEffect(() => {
    const interval = setInterval(
      changeValueShowAlert,
      DEFAULT_ALERT_AUTOCLOSE_TIMEOUT_MS
    )

    return () => {
      clearInterval(interval)
    }
  }, [showAlert])

  function decideClassName() {
    if (
      showAlert === ShowAlertOptions.alertSave ||
      showAlert === ShowAlertOptions.alertCopySuccess
    ) {
      return 'notification bg-color-sucess toast bottom-left'
    }

    return 'notification bg-color-error toast bottom-left'
  }

  function decideSrc() {
    if (
      showAlert === ShowAlertOptions.alertSave ||
      showAlert === ShowAlertOptions.alertCopySuccess
    ) {
      return success
    }

    return error
  }

  function decideMessage() {
    if (showAlert === ShowAlertOptions.alertSave) {
      return (
        <>
          <p className="notification-title">
            {intl.formatMessage(toast.rescueValue) +
              rescue.toLocaleString('pt-br', { minimumFractionDigits: 2 })}
          </p>
          <p className="notification-message">
            {intl.formatMessage(toast.rescueSucess)}
          </p>
        </>
      )
    }

    if (showAlert === ShowAlertOptions.alertCopySuccess) {
      return (
        <>
          <p className="notification-title">
            {intl.formatMessage(toast.code) + code}
          </p>
          <p className="notification-message">
            {intl.formatMessage(toast.copy)}
          </p>
        </>
      )
    }

    if (showAlert === ShowAlertOptions.alertError) {
      return (
        <p className="notification-middle">
          {intl.formatMessage(toast.rescueError)}
        </p>
      )
    }

    return (
      <p className="notification-middle">
        {intl.formatMessage(toast.copyError)}
      </p>
    )
  }

  if (showAlert !== ShowAlertOptions.notShow) {
    return (
      <div className={`notification-container bottom-left`}>
        <div className={decideClassName()}>
          <div className="notification-image">
            <img src={decideSrc()} alt="" />
          </div>
          <div>{decideMessage()}</div>
        </div>
      </div>
    )
  }

  return null
}

export default ToastArea
