import type { FC } from 'react'
import React from 'react'
import { useIntl } from 'react-intl'
import IntlCurrencyInput from 'react-intl-currency-input'
import { Tooltip, IconInfo, Button, Input } from 'vtex.styleguide'
import { useRuntime } from 'vtex.render-runtime'

import { useStore } from '../hooks/useStore'
import '../styles.global.css'
import { input } from '../utils/definedMessages'
import ValidationArea from './validationsArea'

const InputButtonArea: FC = () => {
  const intl = useIntl()

  const { culture } = useRuntime()
  const {
    code,
    updateGiftCardFunction,
    setAddValueGiftCard,
    copyCode,
    setValidation,
    loading,
    loadingCode,
    addValueGiftCard,
    isGiftCardFieldInvalid,
    setIsGiftCardFieldInvalid,
    loadingRedemptionCode,
  } = useStore()

  function submitFunctionValueButton(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    updateGiftCardFunction()
  }

  function submitFunctionCodeButton(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    copyCode()
  }

  const currencyConfig = {
    locale: culture.locale,
    formats: {
      number: {
        currency: {
          style: 'currency',
          currency: culture.currency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
    },
  }

  const handleBlur = (
    event: React.FormEvent<HTMLFormElement>,
    value: string
  ) => {
    event.preventDefault()
    setAddValueGiftCard(value)
  }

  const handleFocus = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setValidation('')
    if (isGiftCardFieldInvalid) setIsGiftCardFieldInvalid(false)
  }

  return (
    <>
      <div className="mb3 width-input mt5 inputs t-body mw9 rescue">
        <div>
          {intl.formatMessage(input.valueLabel)}
          <Tooltip label={intl.formatMessage(input.valueTooltip)}>
            <span className="c-on-base pointer ml2 mt2">
              <IconInfo />
            </span>
          </Tooltip>
        </div>
        <div className="w-100">
          <div className="desktop-or-mobile rescue">
            <div className="lh-copy w-100">
              <label className="vtex-input w-100">
                <div
                  className={`vtex-input-prefix__group flex flex-row items-stretch overflow-hidden br2 bw1 b--solid b--muted-4 hover-b--muted-3 h-large ${
                    isGiftCardFieldInvalid ? 'border-red' : ''
                  }`}
                >
                  <IntlCurrencyInput
                    defaultValue={parseFloat(addValueGiftCard as string)}
                    currency="currency"
                    config={currencyConfig}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="vtex-styleguide-9-x-input ma0 border-box vtex-styleguide-9-x-hideDecorators vtex-styleguide-9-x-noAppearance br2 bl-0 br--right   w-100 bn outline-0 bg-base c-on-base b--muted-4 hover-b--muted-3 t-body pr5 "
                    disabled={loading}
                    data-testid="intl-currency-input"
                  />
                </div>
              </label>
            </div>
            <div className="ml2 mt2">
              <Button
                onClick={submitFunctionValueButton}
                isLoading={loading}
                testId="button-input-currency"
              >
                {intl.formatMessage(input.valueButton)}
              </Button>
            </div>
          </div>
          <ValidationArea />
        </div>
      </div>
      <div className="mb3 mt7 width-input inputs t-body mw9 rescue">
        <div>
          {intl.formatMessage(input.codeLabel)}
          <Tooltip label={intl.formatMessage(input.tooltip)}>
            <span className="c-on-base pointer ml2 mt2">
              <IconInfo />
            </span>
          </Tooltip>
        </div>
        <div className="w-100">
          <div className="desktop-or-mobile rescue">
            <div className="lh-copy w-100">
              <Input
                value={
                  loadingRedemptionCode
                    ? intl.formatMessage(input.loading)
                    : code
                }
                placeholder={intl.formatMessage(input.codePlaceholder)}
                readOnly={true}
                size="large"
                testId="input-test-id"
              />
            </div>
            <div className="ml2 mt2">
              <Button
                onClick={submitFunctionCodeButton}
                isLoading={loadingCode}
                testId="button-input"
              >
                {intl.formatMessage(input.codeButton)}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InputButtonArea
