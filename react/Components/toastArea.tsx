import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import success from '../assets/toast-success.svg'
import error from '../assets/toast-error.svg'
import { useStore } from '../hooks/useStore'
import '../styles.global.css'
import { ShowAlertOptions } from '../utils/showAlertOptions'
import { toast } from '../utils/definedMessages'

const ToastArea = () => {
  const DEFAULT_ALERT_AUTOCLOSE_TIMEOUT_MS = 1000000

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

  if (showAlert === ShowAlertOptions.alertSave) {
    return (
      <div className={`notification-container bottom-left`}>
        <div className={`notification bg-color-sucess toast bottom-left`}>
          <div className="notification-image">
            <img src={success} alt="" />
          </div>
          <div>
            <p className="notification-title">
              {intl.formatMessage(toast.rescueValue) +
                rescue.toLocaleString('pt-br', { minimumFractionDigits: 2 })}
            </p>
            <p className="notification-message">
              {intl.formatMessage(toast.rescueSucess)}
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (showAlert === ShowAlertOptions.alertCopySuccess) {
    return (
      <div className={`notification-container bottom-left`}>
        <div className={`notification bg-color-sucess toast bottom-left`}>
          <div className="notification-image">
            <img src={success} alt="" />
          </div>
          <div>
            <p className="notification-title">
              {intl.formatMessage(toast.code) + code}
            </p>
            <p className="notification-message">
              {intl.formatMessage(toast.copy)}
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (showAlert === ShowAlertOptions.alertError) {
    return (
      <div className={`notification-container bottom-left`}>
        <div className={`notification bg-color-error toast bottom-left`}>
          <div className="notification-image">
            <img src={error} alt="" />
          </div>
          <div>
            <p className="notification-middle">
              {intl.formatMessage(toast.rescueError)}
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (showAlert === ShowAlertOptions.alertCopyError) {
    return (
      <div className={`notification-container bottom-left`}>
        <div className={`notification bg-color-error toast bottom-left`}>
          <div className="notification-image">
            <img src={error} alt="" />
          </div>
          <div>
            <p className="notification-middle">
              {intl.formatMessage(toast.copyError)}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default ToastArea
