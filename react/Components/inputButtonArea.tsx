import type { FC } from 'react'
import React from 'react'
import { useIntl } from 'react-intl'
import IntlCurrencyInput from 'react-intl-currency-input'
import { Tooltip, IconInfo, Button, Input } from 'vtex.styleguide'

import { useStore } from '../hooks/useStore'
import '../styles.global.css'
import { input } from '../utils/definedMessages'
import ValidationArea from './validationsArea'

const InputButtonArea: FC = () => {
  const intl = useIntl()

  const {
    code,
    updateGiftCardFunction,
    setAddValueGiftCard,
    copyCode,
    setValidation,
    loading,
    loadingCode,
    addValueGiftCard,
  } = useStore()

  function submitFunctionValueButton(e: { preventDefault: () => void }) {
    e.preventDefault()
    updateGiftCardFunction()
  }

  function submitFunctionCodeButton(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    copyCode()
  }

  const currencyConfig = {
    locale: 'pt-BR',
    formats: {
      number: {
        BRL: {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
    },
  }

  const handleChange = (
    event: { preventDefault: () => void },
    value: string
  ) => {
    event.preventDefault()
    setAddValueGiftCard(value)
  }

  return (
    <>
      <div className="mb3 width-input mt5 inputs t-body mw9 rescue">
        {intl.formatMessage(input.valueLabel)}
        <div className="w-100">
          <div className="desktop-or-mobile rescue">
            <div className="lh-copy w-100">
              <label className="vtex-input w-100">
                <div
                  className="vtex-input-prefix__group flex flex-row items-stretch overflow-hidden br2 bw1 b--solid b--muted-4 hover-b--muted-3 h-large "
                  id="div-border-color"
                >
                  <IntlCurrencyInput
                    defaultValue={addValueGiftCard}
                    currency="BRL"
                    config={currencyConfig}
                    onFocus={(e: { preventDefault: () => void }) => {
                      e.preventDefault()
                      setValidation('')
                      document
                        .getElementById('div-border-color')
                        ?.classList.remove('border-red')
                    }}
                    onBlur={handleChange}
                    class="vtex-styleguide-9-x-input ma0 border-box vtex-styleguide-9-x-hideDecorators vtex-styleguide-9-x-noAppearance br2 bl-0 br--right   w-100 bn outline-0 bg-base c-on-base b--muted-4 hover-b--muted-3 t-body pr5 "
                    disabled={loading}
                  />
                </div>
              </label>
            </div>
            <div className="ml2 mt2">
              <Button
                onClick={(e: { preventDefault: () => void }) =>
                  submitFunctionValueButton(e)
                }
                isLoading={loading}
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
                value={code}
                placeholder={intl.formatMessage(input.codePlaceholder)}
                readOnly={true}
                size="large"
              />
            </div>
            <div className="ml2 mt2">
              <Button
                onClick={(e: React.FormEvent<HTMLFormElement>) =>
                  submitFunctionCodeButton(e)
                }
                isLoading={loadingCode}
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
