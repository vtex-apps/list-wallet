import React, { useContext } from 'react'
import { History } from 'vtex.gift-card-list'

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
  history: TableHistory[]
  copyCode: () => void
  loading: boolean
  loadingCode: boolean
  rescue: number
  isGiftCardFieldInvalid: boolean
  setIsGiftCardFieldInvalid: (isGiftCardFieldInvalid: boolean) => void
  loadingGiftCard: boolean
  loadingCredit: boolean
  loadingRedemptionCode: boolean
  loadingHistory: boolean
  setFilterHistory: (filterHistory: FilterHistory) => void
}

export const ContextStore = React.createContext<ContextStoreType>({
  button: false,
  setButton: () => { },
  valueGiftCard: 0,
  code: '',
  addValueGiftCard: '',
  setAddValueGiftCard: () => { },
  updateGiftCardFunction: () => { },
  validation: '',
  setValidation: () => { },
  showAlert: ShowAlertOptions.notShow,
  setShowAlert: () => { },
  handleCloseAlert: () => { },
  credit: 0,
  history: [],
  copyCode: () => { },
  loading: false,
  loadingCode: false,
  rescue: 0,
  isGiftCardFieldInvalid: false,
  setIsGiftCardFieldInvalid: () => { },
  loadingGiftCard: false,
  loadingCredit: false,
  loadingRedemptionCode: false,
  loadingHistory: false,
  setFilterHistory: () => { }
})

export function useStore() {
  return useContext(ContextStore)
}
