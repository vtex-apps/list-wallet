import type { FC } from 'react'
import React, { useState } from 'react'

import ContextStore from '../Context/context'

const ProviderStore: FC = (props) => {
  const [button, setButton] = useState(true)

  const valueGiftCard = 1350.55
  const code = 'Codigo'

  return (
    <ContextStore.Provider
      value={{
        button,
        setButton,
        valueGiftCard,
        code,
      }}
    >
      {props.children}
    </ContextStore.Provider>
  )
}

export default ProviderStore
