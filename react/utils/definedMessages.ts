import { defineMessages } from 'react-intl'

export const input = defineMessages({
  valueLabel: { id: 'input.value.label' },
  valueButton: { id: 'input.value.button' },
  codePlaceholder: { id: 'input.code.placeholder' },
  codeLabel: { id: 'input.code.label' },
  codeButton: { id: 'input.code.button' },
  tooltip: { id: 'input.tooltip' },
  loading: { id: 'input.code.loading' },
})

export const titles = defineMessages({
  valueGiftCard: { id: 'titles.value.gift.card' },
  redemption: { id: 'titles.redemption' },
  credit: { id: 'titles.credit' },
})

export const collapsible = defineMessages({
  title: { id: 'collapsible.title' },
})

export const provider = defineMessages({
  withoutCode: { id: 'provider.without.code' },
  negativeValue: { id: 'provider.value.negative' },
  biggerThanCouldBe: { id: 'provider.value.bigger.than.could.be' },
  missingValue: { id: 'provider.missing.value' },
})

export const toast = defineMessages({
  rescueValue: { id: 'toast.rescue.value' },
  rescueSucess: { id: 'toast.rescue.sucess' },
  rescueError: { id: 'toast.rescue.error' },
  code: { id: 'toast.code' },
  copy: { id: 'toast.copy' },
  copyError: { id: 'toast.copy.error' },
  withoutCode: { id: 'toast.without.code' },
})
