import { fireEvent, render } from '@vtex/test-tools/react'
import React from 'react'

import { ContextStore } from '../hooks/useStore'
// eslint-disable-next-line jest/no-mocks-import
import { values } from '../__mocks__/values'
import History from '../Components/history'

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    }
  }

describe('Hisotry Area', () => {
  it('should render the history area', async () => {
    const { container } = render(
      <ContextStore.Provider value={{ ...values }}>
        <History />
      </ContextStore.Provider>
    )

    expect(container).not.toBeNull()
  })

  it('should render the spinner when are loading', async () => {
    const loadingHistory = { loadingHistory: true }

    const { container } = render(
      <ContextStore.Provider value={{ ...values, ...loadingHistory }}>
        <History />
      </ContextStore.Provider>
    )

    const spinner = container.querySelectorAll('svg')[0]

    expect(spinner).toHaveClass('vtex__icon-spinner')
  })

  it('should click on button and open the modal', async () => {
    const onClick = jest.fn()

    const { container } = render(
      <ContextStore.Provider value={{ ...values }}>
        <History />
      </ContextStore.Provider>
    )

    const button = container.querySelectorAll('button')[0]

    button.onclick = onClick()

    fireEvent.click(button)

    expect(onClick).toHaveBeenCalled()
  })
})
