/* eslint-disable jest/no-mocks-import */
import { fireEvent, render } from '@vtex/test-tools/react'
import React from 'react'

import InputButtonArea from '../Components/inputButtonArea'
import { ContextStore } from '../hooks/useStore'
import { values } from '../__mocks__/values'

describe('Input Button Area', () => {
  it('should render the first InputButtonArea', async () => {
    const { getByTestId } = render(
      <ContextStore.Provider value={values}>
        <InputButtonArea />
      </ContextStore.Provider>
    )

    const input = getByTestId('intl-currency-input')

    expect(input).toContainHTML('input')
  })
  it('should render the second InputButtonArea', async () => {
    const { getByTestId } = render(
      <ContextStore.Provider value={values}>
        <InputButtonArea />
      </ContextStore.Provider>
    )

    const input = getByTestId('input-test-id')

    expect(input).toContainHTML('input')
  })

  it('should call onBlur value', async () => {
    const { getByTestId } = render(
      <ContextStore.Provider value={values}>
        <InputButtonArea />
      </ContextStore.Provider>
    )

    const inputCurrency = getByTestId('intl-currency-input') as HTMLInputElement

    fireEvent.blur(inputCurrency as HTMLInputElement)

    expect(values.setAddValueGiftCard).toHaveBeenCalled()
  })

  it('should call onFocus', async () => {
    const { getByTestId } = render(
      <ContextStore.Provider value={values}>
        <InputButtonArea />
      </ContextStore.Provider>
    )

    const inputCurrency = getByTestId('intl-currency-input') as HTMLInputElement

    fireEvent.focus(inputCurrency as HTMLInputElement)

    expect(values.setValidation).toHaveBeenCalled()
    expect(values.setIsGiftCardFieldInvalid).toHaveBeenCalled()
  })

  it('should click on first button', async () => {
    const { getByTestId } = render(
      <ContextStore.Provider value={values}>
        <InputButtonArea />
      </ContextStore.Provider>
    )

    const buttonPointer = getByTestId('button-input-currency')

    fireEvent.click(buttonPointer as HTMLButtonElement)

    expect(values.updateGiftCardFunction).toHaveBeenCalled()
  })

  it('should click on second button', async () => {
    const { getByTestId } = render(
      <ContextStore.Provider value={values}>
        <InputButtonArea />
      </ContextStore.Provider>
    )

    const buttonPointer = getByTestId('button-input')

    fireEvent.click(buttonPointer)

    expect(values.copyCode).toHaveBeenCalled()
  })
})
