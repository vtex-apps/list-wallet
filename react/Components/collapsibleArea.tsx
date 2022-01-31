import React, { FC, useContext } from 'react'
import { Collapsible } from 'vtex.styleguide'

import ContextStore from '../Context/context'
import '../styles.global.css'
import InputButtonArea from './inputButtonArea'
import TitlesArea from './titlesArea'

const CollapsibleArea: FC = () => {
  const provider = useContext(ContextStore)

  return (
    <div className="w-80 center">
      <div className="mb5 mt5">
        <Collapsible
          onClick={() => provider.setButton(!provider.button)}
          isOpen={provider.button}
          align="right"
          arrowAlign="center"
        >
          <TitlesArea />
          <InputButtonArea />
        </Collapsible>
      </div>
    </div>
  )
}

export default CollapsibleArea

/* </div><Collapsible
      onClick={() => provider.setButton(!provider.button)}
      isOpen={provider.button}
      caretColor="primary"
    >
        <div className="mt4">
          <div className="mb3">
            <Input label="Surname" />
          </div>
          <div className="mb3">
            <Input label="Nickname" />
          </div>
        </div>
      </Collapsible></> */
