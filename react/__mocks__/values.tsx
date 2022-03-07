import { ShowAlertOptions } from '../utils/showAlertOptions'

export const values = {
  button: false,
  setButton: jest.fn(),
  valueGiftCard: 10,
  code: 'code',
  addValueGiftCard: '2',
  setAddValueGiftCard: jest.fn(),
  updateGiftCardFunction: jest.fn(),
  validation: 'text validations',
  setValidation: jest.fn(),
  showAlert: ShowAlertOptions.notShow,
  setShowAlert: jest.fn(),
  handleCloseAlert: jest.fn(),
  credit: 2,
  copyCode: jest.fn(),
  loading: false,
  loadingCode: false,
  rescue: 0,
  isGiftCardFieldInvalid: true,
  setIsGiftCardFieldInvalid: jest.fn(),
}
