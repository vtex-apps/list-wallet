import type { FC } from 'react'
import React, { useContext } from 'react'

import Context from '../Context/context'

const ValidationArea: FC = () => {
  const provider = useContext(Context)

  return (
    <div>
      <p className="mt2" style={{ color: 'red', fontSize: '12px' }}>
        {provider.validation}
      </p>
    </div>
  )
}

export default ValidationArea
