import type { FC } from 'react'
import React from 'react'
import { useIntl } from 'react-intl'
import { InputButton, Tooltip, IconInfo } from 'vtex.styleguide'

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
    addValueGiftCard,
  } = useStore()

  function submitFunctionValueButton(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    updateGiftCardFunction()
  }

  function submitFunctionCodeButton(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!navigator.clipboard) return
    navigator.clipboard.writeText(code)
  }

  return (
    <>
      <div className="mb3 width-input mt5 inputs t-body mw9">
        {intl.formatMessage(input.valueLabel)}
        <form onSubmit={(e) => submitFunctionValueButton(e)}>
          <InputButton
            placeholder={intl.formatMessage(input.valuePlaceholder)}
            size="regular"
            button={intl.formatMessage(input.valueButton)}
            onChange={(e: { target: { value: string } }) =>
              setAddValueGiftCard(e.target.value)
            }
            value={addValueGiftCard}
            testId="input-button-test"
          />
          <ValidationArea />
        </form>
      </div>
      <div className="mb3 mt7 width-input inputs t-body mw9">
        <div>
          {intl.formatMessage(input.codeLabel)}
          <Tooltip label={intl.formatMessage(input.tooltip)}>
            <span className="c-on-base pointer ml2 mt2">
              <IconInfo />
            </span>
          </Tooltip>
        </div>
        <form onSubmit={(e) => submitFunctionCodeButton(e)}>
          <InputButton
            placeholder={intl.formatMessage(input.codePlaceholder)}
            size="regular"
            button={intl.formatMessage(input.codeButton)}
            value={code}
            readOnly
            testId="input-button-test-readOnly"
          />
        </form>
      </div>
    </>
  )
}

export default InputButtonArea
