import React, { FC } from 'react'
import { Collapsible } from 'vtex.styleguide'

import { useStore } from '../hooks/useStore'
import '../styles.global.css'
import InputButtonArea from './inputButtonArea'
import TitlesArea from './titlesArea'

const CollapsibleArea: FC = () => {
  const { setButton, button } = useStore()

  return (
    <div className="w-80 center">
      <div className="mb5 mt5">
        <Collapsible
          onClick={() => setButton(!button)}
          isOpen={button}
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
