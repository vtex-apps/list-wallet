import React, { FC, useContext } from 'react'
import { useIntl } from 'react-intl'
import { InputButton, Tooltip, IconInfo } from 'vtex.styleguide'

import ContextStore from '../Context/context'
import '../styles.global.css'
import { input } from '../utils/definedMessages'

const InputButtonArea: FC = () => {
  const intl = useIntl()
  const provider = useContext(ContextStore)

  return (
    <>
      <div className="mb3 width-input mt5 inputs t-body mw9">
        {intl.formatMessage(input.valueLabel)}
        <InputButton
          placeholder={intl.formatMessage(input.valuePlaceholder)}
          size="regular"
          button={intl.formatMessage(input.valueButton)}
        />
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
        <InputButton
          placeholder={intl.formatMessage(input.codePlaceholder)}
          size="regular"
          button={intl.formatMessage(input.codeButton)}
          value={provider.code}
        />
      </div>
    </>
  )
}

export default InputButtonArea
