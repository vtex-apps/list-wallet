import React from 'react'

import { ShowAlertOptions } from '../utils/showAlertOptions'

interface ContextStoreType {
  button: boolean
  setButton: (button: boolean) => void
  valueGiftCard: number | undefined
  code: string
  addValueGiftCard: string | undefined
  setAddValueGiftCard: (addValueGiftCard: string) => void
  updateGiftCardFunction: () => void
  validation: string
  setValidation: (validation: string) => void
  valueLists: number
  showAlert: ShowAlertOptions
  setShowAlert: (showAlert: ShowAlertOptions) => void
  credit: number
}
const ContextStore = React.createContext<ContextStoreType>({
  button: false,
  setButton: () => {},
  valueGiftCard: 0,
  code: '',
  addValueGiftCard: '',
  setAddValueGiftCard: () => {},
  updateGiftCardFunction: () => {},
  validation: '',
  setValidation: () => {},
  valueLists: 0,
  showAlert: ShowAlertOptions.notShow,
  setShowAlert: () => {},
  credit: 0,
})

export default ContextStore
