import type { FC } from 'react'
import React from 'react'
import { useIntl } from 'react-intl'
import { Divider, Spinner } from 'vtex.styleguide'

import { useStore } from '../hooks/useStore'
import '../styles.global.css'
import { titles } from '../utils/definedMessages'

const TitlesArea: FC = () => {
  const intl = useIntl()

  const { valueGiftCard, credit, loadingGiftCard, loadingCredit } = useStore()

  return (
    <div className="mt5 mb6">
      <div className="text-align-center">
        <div className="mb5 t-heading-4">
          {intl.formatMessage(titles.credit)}
          <b className="money">
            {intl.formatMessage(titles.money)}
            {loadingCredit ? (
              <Spinner color="currentColor" size={20} />
            ) : (
              credit.toLocaleString('pt-br', { minimumFractionDigits: 2 })
            )}
          </b>
        </div>
        <div className="mb5 t-heading-4">
          {intl.formatMessage(titles.valueGiftCard)}
          <b className="money">
            {intl.formatMessage(titles.money)}
            {loadingGiftCard ? (
              <Spinner color="currentColor" size={20} />
            ) : (
              valueGiftCard.toLocaleString('pt-br', {
                minimumFractionDigits: 2,
              })
            )}
          </b>
        </div>
        <div className="width-divider center">
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
