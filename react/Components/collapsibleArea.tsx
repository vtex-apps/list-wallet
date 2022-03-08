import type { FC } from 'react'
import React from 'react'
import { useIntl } from 'react-intl'
import { Collapsible } from 'vtex.styleguide'

import { useStore } from '../hooks/useStore'
import '../styles.global.css'
import { collapsible } from '../utils/definedMessages'
import InputButtonArea from './inputButtonArea'
import TitlesArea from './titlesArea'
import ToastArea from './toastArea'

const CollapsibleArea: FC = () => {
  const { setButton, button } = useStore()

  const intl = useIntl()

  return (
    <div className="w-80 center">
      <div className="mb5 mt5">
        <Collapsible
          header={
            <h1 className="t-heading-2">
              {intl.formatMessage(collapsible.title)}
            </h1>
          }
          onClick={() => setButton(!button)}
          isOpen={button}
          align="right"
          arrowAlign="center"
        >
          <TitlesArea />
          <InputButtonArea />
        </Collapsible>
        <ToastArea DEFAULT_ALERT_AUTOCLOSE_TIMEOUT_MS={3000} />
      </div>
    </div>
  )
}

export default CollapsibleArea
