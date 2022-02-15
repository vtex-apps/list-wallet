import { fireEvent, render } from '@vtex/test-tools/react'
import React from 'react'

import CollapsibleArea from '../Components/collapsibleArea'
import { ContextStore } from '../hooks/useStore'
// eslint-disable-next-line jest/no-mocks-import
import { values } from '../__mocks__/values'

describe('Collapsible Area', () => {
  it('should render InputArea if name is name', async () => {
    const { container } = render(
      <ContextStore.Provider value={values}>
        <CollapsibleArea />
      </ContextStore.Provider>
    )

    expect(container.firstChild).not.toBeNull()
  })

  it('should click', async () => {
    const onClick = jest.fn()

    const { container } = render(
      <ContextStore.Provider value={values}>
        <CollapsibleArea />
      </ContextStore.Provider>
    )

    const buttonPointer = container.getElementsByClassName('pointer')

    const button = buttonPointer[0] as HTMLButtonElement

    button.onclick = onClick()

    fireEvent.click(button)

    expect(onClick).toHaveBeenCalled()
  })
})
