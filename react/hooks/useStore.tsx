import React, { useContext } from 'react'

interface ContextStoreType {
  button: boolean
  setButton: (button: boolean) => void
  valueGiftCard: number
  code: string
}

export const ContextStore = React.createContext<ContextStoreType>({
  button: false,
  setButton: () => {},
  valueGiftCard: 0,
  code: '',
})

export function useStore() {
  return useContext(ContextStore)
}
