import { render } from '@vtex/test-tools/react'
import React from 'react'

import { ContextStore } from '../hooks/useStore'
// eslint-disable-next-line jest/no-mocks-import
import { values } from '../__mocks__/values'
import ValidationArea from '../Components/validationsArea'

describe('Validation Area', () => {
  it('should render the validation area', async () => {
    const { container } = render(
      <ContextStore.Provider value={{ ...values }}>
        <ValidationArea />
      </ContextStore.Provider>
    )

    expect(container).not.toBeNull()
  })

  it('should contain text validations', async () => {
    const { getByText } = render(
      <ContextStore.Provider value={{ ...values }}>
        <ValidationArea />
      </ContextStore.Provider>
    )

    const validation = getByText('text validations')

    expect(validation).not.toBeNull()
  })
})
