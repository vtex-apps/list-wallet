import React, { FC, useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import { useIntl } from 'react-intl'

import updateGiftCard from '../queries/updateGiftCard.gql'
import getValueTotalList from '../queries/getValueTotalList.gql'
import getRouteRedemptionCode from '../queries/getRouteRedemptionCode.gql'
import getValueGiftCard from '../queries/getValueGiftCard.gql'
import getValueAlreadyInGiftCard from '../queries/getValueAlreadyInGiftCard.gql'
import { ShowAlertOptions } from '../utils/showAlertOptions'
import { provider } from '../utils/definedMessages'
import { ContextStore } from '../hooks/useStore'

const ProviderStore: FC = (props) => {
  const intl = useIntl()
  const [button, setButton] = useState(true)
  const [addValueGiftCard, setAddValueGiftCard] = useState<string>()
  const [validation, setValidation] = useState('')
  const [valueGiftCard, setValueGiftCard] = useState(0)
  const [valueLists, setValueLists] = useState(0)
  const [code, setCode] = useState(intl.formatMessage(provider.withoutCode))
  const [showAlert, setShowAlert] = useState(ShowAlertOptions.notShow)
  const [credit, setCredit] = useState(0)

  const [updateGiftCardMutation] = useMutation(updateGiftCard)
  const { data: dataValueTotalList } = useQuery(getValueTotalList)
  const { data: dataRedemptionCode } = useQuery(getRouteRedemptionCode)
  const { data: dataGetValueGiftCard, refetch } = useQuery(getValueGiftCard)
  const { data: dataGetValueAlreadyInGiftCard } = useQuery(
    getValueAlreadyInGiftCard
  )

  useEffect(() => {
    const giftCard = dataGetValueGiftCard?.getValueAlreadyInGiftCard
    const list = dataValueTotalList?.getValueTotalList

    if (giftCard && list) {
      setCredit(list - giftCard)
    }
  }, [dataGetValueAlreadyInGiftCard, dataGetValueGiftCard, dataValueTotalList])

  useEffect(() => {
    const value = dataValueTotalList?.getValueTotalList

    if (value) {
      setValueLists(value)
    }
  }, [dataValueTotalList])

  useEffect(() => {
    const redemptionCode = dataRedemptionCode?.getRouteRedemptionCode

    if (redemptionCode !== 'failed') {
      setCode(redemptionCode)
    }
  }, [dataRedemptionCode])

  useEffect(() => {
    const value = dataGetValueGiftCard?.getValueGiftCard

    if (value) {
      setValueGiftCard(value)
    }
  }, [dataGetValueGiftCard])

  function validationValue() {
    if (addValueGiftCard === undefined) {
      setValidation(intl.formatMessage(provider.missingValue))

      return false
    }

    if (parseFloat(addValueGiftCard) <= 0) {
      setValidation(intl.formatMessage(provider.negativeValue))

      return false
    }

    if (parseFloat(addValueGiftCard) > credit) {
      setValidation(
        intl.formatMessage(provider.biggerThanCouldBe) + credit.toString()
      )

      return false
    }

    return true
  }

  async function updateGiftCardFunction() {
    setShowAlert(ShowAlertOptions.notShow)
    const valid = validationValue()

    if (valid) {
      const { data } = await updateGiftCardMutation({
        variables: {
          value: parseFloat(addValueGiftCard as string),
        },
      })

      if (data) {
        setShowAlert(ShowAlertOptions.alertSave)
        refetch()
      } else {
        setShowAlert(ShowAlertOptions.alertError)
      }
    }
  }

  return (
    <ContextStore.Provider
      value={{
        button,
        setButton,
        valueGiftCard,
        code,
        addValueGiftCard,
        setAddValueGiftCard,
        updateGiftCardFunction,
        validation,
        setValidation,
        valueLists,
        showAlert,
        setShowAlert,
        credit,
      }}
    >
      {props.children}
    </ContextStore.Provider>
  )
}

export default ProviderStore
