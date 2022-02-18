import { defineMessages } from 'react-intl'

export const input = defineMessages({
  valuePlaceholder: { id: 'input.value.placeholder' },
  valueLabel: { id: 'input.value.label' },
  valueButton: { id: 'input.value.button' },
  codePlaceholder: { id: 'input.code.placeholder' },
  codeLabel: { id: 'input.code.label' },
  codeButton: { id: 'input.code.button' },
  tooltip: { id: 'input.tooltip' },
})

export const titles = defineMessages({
  valueGiftCard: { id: 'titles.value.gift.card' },
  money: { id: 'titles.money' },
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

export const alert = defineMessages({
  sucess: { id: 'alert.sucess' },
  error: { id: 'alert.error' },
  copy: { id: 'alert.copy' },
  copyError: { id: 'alert.copy.error' },
})
