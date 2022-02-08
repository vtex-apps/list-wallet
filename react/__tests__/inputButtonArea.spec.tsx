/* eslint-disable jest/no-mocks-import */
import { fireEvent, render } from '@vtex/test-tools/react'
import React from 'react'

import InputButtonArea from '../Components/inputButtonArea'
import { ContextStore } from '../hooks/useStore'
import { values } from '../__mocks__/values'

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: () => {},
  },
})

describe('Input Button Area', () => {
  it('should render the first InputButtonArea', async () => {
    const { getByTestId } = render(
      <ContextStore.Provider value={values}>
        <InputButtonArea />
      </ContextStore.Provider>
    )

    const input = getByTestId('input-button-test')

    expect(input).toContainHTML('input')
  })
  it('should render the second InputButtonArea', async () => {
    const { getByTestId } = render(
      <ContextStore.Provider value={values}>
        <InputButtonArea />
      </ContextStore.Provider>
    )

    const input = getByTestId('input-button-test-readOnly')

    expect(input).toContainHTML('input')
  })

  it('should change value', async () => {
    const { getByTestId } = render(
      <ContextStore.Provider value={values}>
        <InputButtonArea />
      </ContextStore.Provider>
    )

    const changeValue = { target: { value: '12.2' } }

    const input = getByTestId('input-button-test').querySelector('input')

    fireEvent.change(input as HTMLInputElement, changeValue)

    expect(values.setAddValueGiftCard).toHaveBeenCalledWith('12.2')
  })

  it('should change value if name = name', async () => {
    const { getByTestId } = render(
      <ContextStore.Provider value={values}>
        <InputButtonArea />
      </ContextStore.Provider>
    )

    const changeValue = { target: { value: '12.2' } }

    const input = getByTestId('input-button-test').querySelector('input')

    fireEvent.change(input as HTMLInputElement, changeValue)

    expect(values.setAddValueGiftCard).toHaveBeenCalledWith('12.2')
  })

  it('should click on first submit', async () => {
    const { container } = render(
      <ContextStore.Provider value={values}>
        <InputButtonArea />
      </ContextStore.Provider>
    )

    const buttonPointer = container.getElementsByClassName('pointer')

    fireEvent.click(buttonPointer[0] as HTMLButtonElement)

    expect(values.updateGiftCardFunction).toHaveBeenCalled()
  })

  it('should click on second submit', async () => {
    const { container } = render(
      <ContextStore.Provider value={values}>
        <InputButtonArea />
      </ContextStore.Provider>
    )

    const buttonPointer = container.getElementsByClassName('pointer')

    fireEvent.click(buttonPointer[2])

    expect(values.updateGiftCardFunction).toHaveBeenCalled()
  })

  // it('should click on second submit', async () => {
  //   const { container } = render(
  //     <ContextStore.Provider value={values}>
  //       <InputButtonArea />
  //     </ContextStore.Provider>
  //   )

  //   const buttonPointer = container.getElementsByClassName(
  //     'pointer'
  //   )[2] as HTMLButtonElement

  //   fireEvent.click(buttonPointer as HTMLButtonElement)

  //   //expect(copy).toHaveBeenCalled()
  // })
})
