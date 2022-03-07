import { wait } from '@apollo/react-testing'
import { render } from '@vtex/test-tools/react'
import React from 'react'

import ToastArea from '../Components/toastArea'
import { ContextStore } from '../hooks/useStore'
import { ShowAlertOptions } from '../utils/showAlertOptions'
// eslint-disable-next-line jest/no-mocks-import
import { values } from '../__mocks__/values'

describe('Toast Area', () => {
  it('should render success Alert if showAlert = 0', async () => {
    const showAlert = { showAlert: ShowAlertOptions.notShow }

    const { container } = render(
      <ContextStore.Provider value={{ ...values, ...showAlert }}>
        <ToastArea />
      </ContextStore.Provider>
    )

    expect(container.firstChild).toBeNull()
  })

  it('should render success Alert if showAlert = 1', async () => {
    const showAlert = { showAlert: ShowAlertOptions.alertSave }

    const { container } = render(
      <ContextStore.Provider value={{ ...values, ...showAlert }}>
        <ToastArea />
      </ContextStore.Provider>
    )

    expect(container?.firstChild?.firstChild).toHaveClass('bg-color-sucess')
  })

  it('should render error Alert if showAlert = 2', async () => {
    const showAlert = { showAlert: ShowAlertOptions.alertError }

    const { container } = render(
      <ContextStore.Provider value={{ ...values, ...showAlert }}>
        <ToastArea />
      </ContextStore.Provider>
    )

    expect(container?.firstChild?.firstChild).toHaveClass('bg-color-error')
  })

  it('should render success Alert if showAlert = 3', async () => {
    const showAlert = { showAlert: ShowAlertOptions.alertCopySuccess }

    const { container } = render(
      <ContextStore.Provider value={{ ...values, ...showAlert }}>
        <ToastArea />
      </ContextStore.Provider>
    )

    expect(container?.firstChild?.firstChild).toHaveClass('bg-color-sucess')
  })

  it('should render error Alert if showAlert = 4', async () => {
    const showAlert = { showAlert: ShowAlertOptions.alertCopyError }

    const { container } = render(
      <ContextStore.Provider value={{ ...values, ...showAlert }}>
        <ToastArea />
      </ContextStore.Provider>
    )

    expect(container?.firstChild?.firstChild).toHaveClass('bg-color-error')
  })

  it('should render error Alert if showAlert = 5', async () => {
    const showAlert = { showAlert: ShowAlertOptions.alertWithoutCode }

    const { container } = render(
      <ContextStore.Provider value={{ ...values, ...showAlert }}>
        <ToastArea />
      </ContextStore.Provider>
    )

    expect(container?.firstChild?.firstChild).toHaveClass('bg-color-error')
  })

  it('should set ShowAlertOptions to notShow when finalize the timer', async () => {
    const showAlert = { showAlert: ShowAlertOptions.alertCopyError }

    const { container } = render(
      <ContextStore.Provider value={{ ...values, ...showAlert }}>
        <ToastArea />
      </ContextStore.Provider>
    )

    expect(container?.firstChild?.firstChild).toHaveClass('bg-color-error')

    await wait(3000)

    expect(values.setShowAlert).toHaveBeenCalled()
  })
})
