import type { FC } from 'react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'

import success from '../assets/toast-success.svg'
import error from '../assets/toast-error.svg'
import { useStore } from '../hooks/useStore'
import '../styles.global.css'
import { ShowAlertOptions } from '../utils/showAlertOptions'
import { toast } from '../utils/definedMessages'

interface Props {
  duration?: number
}

const ToastArea: FC<Props> = ({ duration = 3000 }) => {
  const intl = useIntl()

  const { culture } = useRuntime()

  const { showAlert, setShowAlert, rescue, code } = useStore()

  interface AlertInfo {
    className: string
    imageSrc: string
    message: React.ReactFragment
  }

  const dictionary: { [key: number]: AlertInfo } = {
    1: {
      className: 'notification bg-color-sucess toast bottom-left',
      imageSrc: success,
      message: (
        <>
          <p className="notification-title">
            {`${
              intl.formatMessage(toast.rescueValue) +
              (culture.customCurrencySymbol as string)
            } ${rescue.toLocaleString(culture.locale, {
              minimumFractionDigits: 2,
            })}`}
          </p>
          <p className="notification-message">
            {intl.formatMessage(toast.rescueSucess)}
          </p>
        </>
      ),
    },
    2: {
      className: 'notification bg-color-error toast bottom-left',
      imageSrc: error,
      message: (
        <p className="notification-middle">
          {intl.formatMessage(toast.rescueError)}
        </p>
      ),
    },
    3: {
      className: 'notification bg-color-sucess toast bottom-left',
      imageSrc: success,
      message: (
        <>
          <p className="notification-title">
            {intl.formatMessage(toast.code) + code}
          </p>
          <p className="notification-message">
            {intl.formatMessage(toast.copy)}
          </p>
        </>
      ),
    },
    4: {
      className: 'notification bg-color-error toast bottom-left',
      imageSrc: error,
      message: (
        <p className="notification-middle">
          {intl.formatMessage(toast.copyError)}
        </p>
      ),
    },
    5: {
      className: 'notification bg-color-error toast bottom-left',
      imageSrc: error,
      message: (
        <p className="notification-middle">
          {intl.formatMessage(toast.withoutCode)}
        </p>
      ),
    },
  }

  const alertInfo = dictionary[showAlert]

  function changeValueShowAlert() {
    if (showAlert !== ShowAlertOptions.notShow) {
      setShowAlert(ShowAlertOptions.notShow)
    }
  }

  useEffect(() => {
    const interval = setInterval(changeValueShowAlert, duration)

    return () => {
      clearInterval(interval)
    }
  }, [showAlert])

  if (showAlert !== ShowAlertOptions.notShow) {
    return (
      <div className={`notification-container bottom-left`}>
        <div className={alertInfo.className}>
          <div className="notification-image">
            <img src={alertInfo.imageSrc} alt="" />
          </div>
          <div>{alertInfo.message}</div>
        </div>
      </div>
    )
  }

  return null
}

export default ToastArea
