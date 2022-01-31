import React from 'react'

interface ContextStoreType {
  button: boolean
  setButton: (button: boolean) => void
  valueGiftCard: number
  code: string
}
const ContextStore = React.createContext<ContextStoreType>({
  button: false,
  setButton: () => {},
  valueGiftCard: 0,
  code: '',
})

export default ContextStore
