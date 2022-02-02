import type { FC } from 'react'
import React from 'react'

import { useStore } from '../hooks/useStore'

const ValidationArea: FC = () => {
  const { validation } = useStore()

  return (
    <div>
      <p className="mt2" style={{ color: 'red', fontSize: '12px' }}>
        {validation}
      </p>
    </div>
  )
}

export default ValidationArea
