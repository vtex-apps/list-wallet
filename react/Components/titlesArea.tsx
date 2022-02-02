import React, { FC } from 'react'
import { useIntl } from 'react-intl'
import { Divider } from 'vtex.styleguide'

import { useStore } from '../hooks/useStore'
import '../styles.global.css'
import { titles } from '../utils/definedMessages'

const TitlesArea: FC = () => {
  const intl = useIntl()

  const { valueGiftCard, credit } = useStore()

  return (
    <div className="mt5 mb6">
      <div className="text-align-center">
        <div className="mb5 t-heading-4">
          {intl.formatMessage(titles.credit)}
          <b>
            {intl.formatMessage(titles.money)} {credit}
          </b>
        </div>
        <div className="mb5 t-heading-4">
          {intl.formatMessage(titles.valueGiftCard)}
          <b>
            {intl.formatMessage(titles.money)} {valueGiftCard}
          </b>
        </div>
        <div className="w-40 center">
          <Divider />
        </div>
        <div className="mt5 t-heading-4">
          {intl.formatMessage(titles.redemption)}
        </div>
      </div>
    </div>
  )
}

export default TitlesArea
