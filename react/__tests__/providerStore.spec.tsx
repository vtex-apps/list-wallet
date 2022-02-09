import { act, fireEvent, render, waitFor } from '@vtex/test-tools/react'
import React from 'react'
import { MockedProvider, wait } from '@apollo/react-testing'

// eslint-disable-next-line jest/no-mocks-import
import {
  mocks,
  mocksUpdateReturnError,
  mocksUpdate,
} from '../__mocks__/mockUseQuery'
import ProviderStore from '../provider/providerStore'
import { ContextStore } from '../hooks/useStore'
import { ShowAlertOptions } from '../utils/showAlertOptions'

describe('Provider', () => {
  it('should render provider', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProviderStore />
      </MockedProvider>
    )

    await act(async () => {
      await wait(0)
    })

    expect(container).not.toBeNull()
  })

  it('should test function handleCloseAlert', async () => {
    const TestComponent = () => {
      const { handleCloseAlert, showAlert } = React.useContext(ContextStore)

      return (
        <>
          <div data-testid="showAlert">{showAlert}</div>
          <button onClick={handleCloseAlert} data-testid="buttonShowAlert">
            SetShowAlert
          </button>
        </>
      )
    }

    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProviderStore>
          <TestComponent />
        </ProviderStore>
      </MockedProvider>
    )

    await act(async () => {
      await wait(0)
      getByTestId('buttonShowAlert').click()
    })

    const showAlertValue = getByTestId('showAlert').textContent

    expect(showAlertValue).toBe('0')
  })

  it('should test function validateIfAllFieldsIsComplete failed if I dont send a addValueGiftCard', async () => {
    const TestComponent = () => {
      const { validation, updateGiftCardFunction } =
        React.useContext(ContextStore)

      return (
        <>
          <div data-testid="validateText">{validation}</div>
          <button data-testid="buttonUpdate" onClick={updateGiftCardFunction}>
            update
          </button>
        </>
      )
    }

    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProviderStore>
          <TestComponent />
        </ProviderStore>
      </MockedProvider>
    )

    await act(async () => {
      await wait(0)
      fireEvent.click(getByTestId('buttonUpdate'))
    })

    const validateText = getByTestId('validateText').textContent

    expect(validateText).not.toBeNull()
  })

  it('should test function validateIfAllFieldsIsComplete failed if I send a addValueGiftCard <= 0', async () => {
    const TestComponent = () => {
      const { validation, updateGiftCardFunction, setAddValueGiftCard } =
        React.useContext(ContextStore)

      return (
        <>
          <button
            data-testid="addValue"
            onClick={() => setAddValueGiftCard('-2')}
          >
            add
          </button>
          <div data-testid="validateText">{validation}</div>
          <button data-testid="buttonUpdate" onClick={updateGiftCardFunction}>
            update
          </button>
        </>
      )
    }

    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProviderStore>
          <TestComponent />
        </ProviderStore>
      </MockedProvider>
    )

    await act(async () => {
      await wait(0)
      fireEvent.click(getByTestId('addValue'))
      fireEvent.click(getByTestId('buttonUpdate'))
    })

    const validateText = getByTestId('validateText').textContent

    expect(validateText).not.toBeNull()
  })

  it('should test function validateIfAllFieldsIsComplete failed if I send a addValueGiftCard > credit', async () => {
    const TestComponent = () => {
      const { validation, updateGiftCardFunction, setAddValueGiftCard } =
        React.useContext(ContextStore)

      return (
        <>
          <button
            data-testid="addValue"
            onClick={() => setAddValueGiftCard('6')}
          >
            add
          </button>
          <div data-testid="validateText">{validation}</div>
          <button data-testid="buttonUpdate" onClick={updateGiftCardFunction}>
            update
          </button>
        </>
      )
    }

    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProviderStore>
          <TestComponent />
        </ProviderStore>
      </MockedProvider>
    )

    await act(async () => {
      await wait(0)
      fireEvent.click(getByTestId('addValue'))
      fireEvent.click(getByTestId('buttonUpdate'))
    })

    const validateText = getByTestId('validateText').textContent

    expect(validateText).not.toBeNull()
  })

  it('should test function validateIfAllFieldsIsComplete sucess if I send a addValueGiftCard valid', async () => {
    const TestComponent = () => {
      const { updateGiftCardFunction, setAddValueGiftCard, validation } =
        React.useContext(ContextStore)

      return (
        <>
          <button
            data-testid="addValue"
            onClick={() => setAddValueGiftCard('5')}
          >
            add
          </button>
          <div data-testid="validation">{validation}</div>
          <button data-testid="buttonUpdate" onClick={updateGiftCardFunction}>
            update
          </button>
        </>
      )
    }

    const { getByTestId } = render(
      <MockedProvider mocks={mocksUpdate} addTypename={false}>
        <ProviderStore>
          <TestComponent />
        </ProviderStore>
      </MockedProvider>
    )

    await act(async () => {
      await wait(0)
      fireEvent.click(getByTestId('addValue'))
      fireEvent.click(getByTestId('buttonUpdate'))
    })

    const validationValue = getByTestId('validation').textContent

    await act(async () => {
      await wait(0)
    })

    expect(validationValue).toStrictEqual('')
  })

  it('should test function update if I send a addValueGiftCard valid and the return of mutation is a sucess', async () => {
    const TestComponent = () => {
      const { showAlert, updateGiftCardFunction, setAddValueGiftCard } =
        React.useContext(ContextStore)

      return (
        <>
          <button
            data-testid="addValue"
            onClick={() => setAddValueGiftCard('5')}
          >
            add
          </button>
          <div data-testid="alert">{showAlert}</div>
          <button data-testid="buttonUpdate" onClick={updateGiftCardFunction}>
            update
          </button>
        </>
      )
    }

    const { getByTestId } = render(
      <MockedProvider mocks={mocksUpdate} addTypename={false}>
        <ProviderStore>
          <TestComponent />
        </ProviderStore>
      </MockedProvider>
    )

    await act(async () => {
      await wait(0)
      fireEvent.click(getByTestId('addValue'))
      fireEvent.click(getByTestId('buttonUpdate'))
    })

    const alertValue = getByTestId('alert')

    waitFor(() => {
      expect(alertValue).toHaveTextContent(
        ShowAlertOptions.alertSave.toString()
      )
    })
  })

  it('should test function update if I send a addValueGiftCard valid and the return of mutation is a failed', async () => {
    const TestComponent = () => {
      const { showAlert, updateGiftCardFunction, setAddValueGiftCard } =
        React.useContext(ContextStore)

      return (
        <>
          <button
            data-testid="addValue"
            onClick={() => setAddValueGiftCard('5')}
          >
            add
          </button>
          <div data-testid="alert">{showAlert}</div>
          <button data-testid="buttonUpdate" onClick={updateGiftCardFunction}>
            update
          </button>
        </>
      )
    }

    const { getByTestId } = render(
      <MockedProvider mocks={mocksUpdateReturnError} addTypename={false}>
        <ProviderStore>
          <TestComponent />
        </ProviderStore>
      </MockedProvider>
    )

    await act(async () => {
      await wait(0)
      fireEvent.click(getByTestId('addValue'))
      fireEvent.click(getByTestId('buttonUpdate'))
    })

    const alertValue = getByTestId('alert')

    waitFor(() => {
      expect(alertValue).toHaveTextContent(
        ShowAlertOptions.alertError.toString()
      )
    })
  })
})
