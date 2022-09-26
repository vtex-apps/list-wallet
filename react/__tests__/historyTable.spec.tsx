import { act, fireEvent, render } from '@vtex/test-tools/react'
import React from 'react'
import { wait } from '@apollo/react-testing'

import HistoryTable from '../Components/historyTable'
import { ContextStore } from '../hooks/useStore'
// eslint-disable-next-line jest/no-mocks-import
import { values } from '../__mocks__/values'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe('History Table Area', () => {
  it('should render the history table', async () => {
    const { container } = render(
      <ContextStore.Provider value={values}>
        <HistoryTable />
      </ContextStore.Provider>
    )

    expect(container.firstChild).not.toBeNull()
  })

  it('should render and click on previous page button', async () => {
    const { container } = render(
      <ContextStore.Provider value={{ ...values }}>
        <HistoryTable />
      </ContextStore.Provider>
    )

    const button = container.querySelectorAll('button')

    fireEvent.click(button[4])
    fireEvent.click(button[3])
    expect(container.firstChild).not.toBeNull()
  })

  it('should render and click on next page button', async () => {
    const { container } = render(
      <ContextStore.Provider value={{ ...values }}>
        <HistoryTable />
      </ContextStore.Provider>
    )

    const button = container.querySelectorAll('button')

    fireEvent.click(button[4])
    expect(container.firstChild).not.toBeNull()
  })

  it('should render the status area and change the status filter to deposits', async () => {
    const { container } = render(
      <ContextStore.Provider value={{ ...values }}>
        <HistoryTable />
      </ContextStore.Provider>
    )

    const button = container.querySelectorAll('button')

    fireEvent.click(button[1])

    const buttonApply = container.querySelectorAll('button')[2]

    const select = container.querySelectorAll('select')[0] as HTMLSelectElement

    expect(select.value).toStrictEqual('')

    select.value = select.options[2].value // <-- select a new value

    fireEvent.change(select)

    fireEvent.click(buttonApply)

    expect(select.value).toStrictEqual('deposits')
  })

  it('should render the status area and change the status filter to withdrawals', async () => {
    const { container } = render(
      <ContextStore.Provider value={{ ...values }}>
        <HistoryTable />
      </ContextStore.Provider>
    )

    const button = container.querySelectorAll('button')

    fireEvent.click(button[1])

    const buttonApply = container.querySelectorAll('button')[2]

    const select = container.querySelectorAll('select')[0] as HTMLSelectElement

    expect(select.value).toStrictEqual('')

    select.value = select.options[3].value // <-- select a new value

    fireEvent.change(select)

    await act(async () => {
      await wait(0)
      fireEvent.click(buttonApply)
    })

    expect(select.value).toStrictEqual('withdrawals')
  })

  it('should render the date picker area and change the date filter', async () => {
    const { container } = render(
      <ContextStore.Provider value={{ ...values }}>
        <HistoryTable />
      </ContextStore.Provider>
    )

    const button = container.querySelectorAll('button')

    fireEvent.click(button[0])

    const input = container.querySelectorAll('input')

    await act(async () => {
      await wait(0)
      fireEvent.change(input[1], { target: { value: '29/06/2022' } })
    })

    const buttonApply = container.querySelectorAll('button')[1]

    fireEvent.click(buttonApply)

    expect(input[1]).toHaveValue('29/06/2022')
  })

  it('should render the date picker range area and change the date filter', async () => {
    const { container } = render(
      <ContextStore.Provider value={{ ...values }}>
        <HistoryTable />
      </ContextStore.Provider>
    )

    const button = container.querySelectorAll('button')

    await act(async () => {
      await wait(0)
      fireEvent.click(button[0])
    })

    const div = container?.querySelectorAll(
      'div.css-1pcexqc-container.pointer.bw1.t-body'
    )[0] as any

    const reactHandlerKey = Object.keys(div).filter(function (item) {
      return item.indexOf('__reactEventHandlers') >= 0
    })

    div[reactHandlerKey[0]].children[1].props.selectProps.onMenuOpen()

    await wait(0)

    const openMenu = container.querySelectorAll('div.css-h54wua-menu')[0]

    const between = openMenu.querySelectorAll('div')[3]

    await act(async () => {
      await wait(0)
      between.click()
    })

    const input = container.querySelectorAll('input')

    await act(async () => {
      await wait(0)
      fireEvent.change(input[1], { target: { value: '29/06/2022' } })
      fireEvent.change(input[2], { target: { value: '29/07/2022' } })
    })

    const buttonApply = container.querySelectorAll('button')[1]

    await act(async () => {
      await wait(0)
      fireEvent.click(buttonApply)
    })

    expect(input[1]).toHaveValue('29/06/2022')
    expect(input[2]).toHaveValue('29/07/2022')
  })

  it('should render the date picker range area and remove the filter after', async () => {
    const { container } = render(
      <ContextStore.Provider value={{ ...values }}>
        <HistoryTable />
      </ContextStore.Provider>
    )

    const button = container.querySelectorAll('button')

    await act(async () => {
      await wait(0)
      fireEvent.click(button[0])
    })

    const div = container?.querySelectorAll(
      'div.css-1pcexqc-container.pointer.bw1.t-body'
    )[0] as any

    const reactHandlerKey = Object.keys(div).filter(function (item) {
      return item.indexOf('__reactEventHandlers') >= 0
    })

    div[reactHandlerKey[0]].children[1].props.selectProps.onMenuOpen()

    await wait(0)

    const openMenu = container.querySelectorAll('div.css-h54wua-menu')[0]

    const between = openMenu.querySelectorAll('div')[3]

    await act(async () => {
      await wait(0)
      between.click()
    })

    const input = container.querySelectorAll('input')

    await act(async () => {
      await wait(0)
      fireEvent.change(input[1], { target: { value: '29/06/2022' } })
      fireEvent.change(input[2], { target: { value: '29/07/2022' } })
    })

    const buttonApply = container.querySelectorAll('button')[1]

    await act(async () => {
      await wait(0)
      fireEvent.click(buttonApply)
    })

    await act(async () => {
      await wait(0)
      fireEvent.change(input[1], { target: { value: '' } })
      fireEvent.change(input[2], { target: { value: '29/07/2022' } })
    })

    const buttonRemoveFilter = container.querySelectorAll(
      'button.vtex-button.bw1.ba.fw5.v-mid.relative.pa0.lh-solid.br2.min-h-small.t-action--small.bg-transparent.b--transparent.c-action-primary.hover-b--transparent.hover-bg-action-secondary.hover-b--action-secondary.pointer'
    )[0] as HTMLButtonElement

    await act(async () => {
      await wait(0)
      buttonRemoveFilter.click()
    })

    const buttonRemoveFilterAfter = container.querySelectorAll(
      'button.vtex-button.bw1.ba.fw5.v-mid.relative.pa0.lh-solid.br2.min-h-small.t-action--small.bg-transparent.b--transparent.c-action-primary.hover-b--transparent.hover-bg-action-secondary.hover-b--action-secondary.pointer'
    )[0] as HTMLButtonElement

    expect(buttonRemoveFilterAfter).toBeUndefined()
  })
})
