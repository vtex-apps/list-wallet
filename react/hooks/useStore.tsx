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
  setShowAlert: (showAlert: ShowAlertOptions) => void
  handleCloseAlert: () => void
  credit: number
  copyCode: () => void
  loading: boolean
  loadingCode: boolean
  rescue: number
  isGiftCardFieldInvalid: boolean
  setIsGiftCardFieldInvalid: (isGiftCardFieldInvalid: boolean) => void
  loadingGiftCard: boolean
  loadingCredit: boolean
  loadingRedemptionCode: boolean
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
  setShowAlert: () => {},
  handleCloseAlert: () => {},
  credit: 0,
  copyCode: () => {},
  loading: false,
  loadingCode: false,
  rescue: 0,
  isGiftCardFieldInvalid: false,
  setIsGiftCardFieldInvalid: () => {},
  loadingGiftCard: false,
  loadingCredit: false,
  loadingRedemptionCode: false,
})

export function useStore() {
  return useContext(ContextStore)
}
