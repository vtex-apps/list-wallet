import type { FC } from 'react'
import React from 'react'
import { useIntl } from 'react-intl'
import {
  InputButton,
  Tooltip,
  IconInfo,
  InputCurrency,
  Button,
  Input,
} from 'vtex.styleguide'

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
    addValueGiftCard,
    setValidation,
    loading,
    loadingCode,
  } = useStore()

  function submitFunctionValueButton(e: { preventDefault: () => void }) {
    e.preventDefault()
    updateGiftCardFunction()
  }

  function submitFunctionCodeButton(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    copyCode()
  }

  return (
    <>
      <div className="mb3 width-input mt5 inputs t-body mw9 rescue">
        {intl.formatMessage(input.valueLabel)}
        <div className="c-on-base w-100">
          <div className="flex justify-between rescue">
            <div className="lh-copy w-100">
              <InputCurrency
                value={addValueGiftCard}
                size="large"
                placeholder={intl.formatMessage(input.valuePlaceholder)}
                locale="pt-BR"
                currencyCode="BRL"
                onChange={(e: { target: { value: string } }) => {
                  setAddValueGiftCard(e.target.value)
                }}
                onFocus={(e: { preventDefault: () => void }) => {
                  e.preventDefault()
                  setValidation('')
                }}
                readOnly={loading}
              />
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
        <div className="c-on-base w-100">
          <div className="flex justify-between rescue">
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
