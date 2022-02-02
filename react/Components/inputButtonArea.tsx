import React, { FC, useContext } from 'react'
import { useIntl } from 'react-intl'
import { InputButton, Tooltip, IconInfo } from 'vtex.styleguide'
import copy from 'clipboard-copy'

import ContextStore from '../Context/context'
import '../styles.global.css'
import { input } from '../utils/definedMessages'
import ValidationArea from './validationsArea'

const InputButtonArea: FC = () => {
  const intl = useIntl()
  const provider = useContext(ContextStore)

  function submitFunctionValueButton(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    provider.updateGiftCardFunction()
  }

  function submitFunctionCodeButton(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    copy(provider.code)
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
              provider.setAddValueGiftCard(e.target.value)
            }
            value={provider.addValueGiftCard}
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
            value={provider.code}
            readOnly
          />
        </form>
      </div>
    </>
  )
}

export default InputButtonArea
