import React, { useContext } from 'react'

import { ShowAlertOptions } from '../utils/showAlertOptions'

interface ContextStoreType {
  button: boolean
  setButton: (button: boolean) => void
  valueGiftCard: number
  code: string
  addValueGiftCard: string | undefined
  setAddValueGiftCard: (addValueGiftCard: string) => void
  updateGiftCardFunction: () => void
  validation: string
  setValidation: (validation: string) => void
  showAlert: ShowAlertOptions
  handleCloseAlert: () => void
  credit: number
  copyCode: () => void
  loading: boolean
  loadingCode: boolean
}

export const ContextStore = React.createContext<ContextStoreType>({
  button: false,
  setButton: () => {},
  valueGiftCard: 0,
  code: '',
  addValueGiftCard: '',
  setAddValueGiftCard: () => {},
  updateGiftCardFunction: () => {},
  validation: '',
  setValidation: () => {},
  showAlert: ShowAlertOptions.notShow,
  handleCloseAlert: () => {},
  credit: 0,
  copyCode: () => {},
  loading: false,
  loadingCode: false,
})

export function useStore() {
  return useContext(ContextStore)
}
