import { render } from '@vtex/test-tools/react'
import React from 'react'

import TitlesArea from '../Components/titlesArea'
import { ContextStore } from '../hooks/useStore'
// eslint-disable-next-line jest/no-mocks-import
import { values } from '../__mocks__/values'

describe('Titles Area', () => {
  it('should render a titles area', async () => {
    const { container } = render(
      <ContextStore.Provider value={{ ...values }}>
        <TitlesArea />
      </ContextStore.Provider>
    )

    expect(container.firstChild).not.toBeNull()

    expect(container.firstChild).toHaveTextContent(values.credit.toString())
  })
})
