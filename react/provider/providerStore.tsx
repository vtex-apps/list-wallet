import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import { useIntl } from 'react-intl'

import { provider } from '../utils/definedMessages'
import updateGiftCard from '../queries/updateGiftCard.gql'
import getValueTotalList from '../queries/getValueTotalList.gql'
import getRouteRedemptionCode from '../queries/getRouteRedemptionCode.gql'
import getValueGiftCard from '../queries/getValueGiftCard.gql'
import getValueAlreadyInGiftCard from '../queries/getValueAlreadyInGiftCard.gql'
import { ShowAlertOptions } from '../utils/showAlertOptions'
import { ContextStore } from '../hooks/useStore'

const ProviderStore: FC = (props) => {
  const intl = useIntl()
  const [rescue, setRescue] = useState(0)
  const [button, setButton] = useState(false)
  const [addValueGiftCard, setAddValueGiftCard] = useState<string>()
  const [validation, setValidation] = useState('')
  const [valueGiftCard, setValueGiftCard] = useState(0)
  const [code, setCode] = useState(intl.formatMessage(provider.withoutCode))
  const [showAlert, setShowAlert] = useState(ShowAlertOptions.notShow)
  const [credit, setCredit] = useState(0)
  const [loading, setLoading] = useState(false)
  const [loadingCode, setLoadingCode] = useState(false)
  const [borderRed, setBorderRed] = useState(false)

  const [updateGiftCardMutation] = useMutation(updateGiftCard)
  const { data: dataValueTotalList } = useQuery(getValueTotalList)
  const { data: dataRedemptionCode } = useQuery(getRouteRedemptionCode)
  const { data: dataGetValueGiftCard, refetch: refetchGetValueGiftCard } =
    useQuery(getValueGiftCard)

  const {
    data: dataGetValueAlreadyInGiftCard,
    refetch: refetchValueAlreadyInGiftCard,
  } = useQuery(getValueAlreadyInGiftCard)

  useEffect(() => {
    const giftCard = dataGetValueAlreadyInGiftCard?.getValueAlreadyInGiftCard
    let list = dataValueTotalList?.getValueTotalList

    if (giftCard !== undefined && list !== undefined) {
      list /= 100
      setCredit(Number((list - giftCard).toFixed(2)))
    }
  }, [dataGetValueAlreadyInGiftCard, dataGetValueGiftCard, dataValueTotalList])

  useEffect(() => {
    const redemptionCode = dataRedemptionCode?.getRouteRedemptionCode

    if (redemptionCode !== 'failed') {
      setCode(redemptionCode)
    }
  }, [dataRedemptionCode])

  useEffect(() => {
    const value = dataGetValueGiftCard?.getValueGiftCard

    if (value !== undefined) {
      setValueGiftCard(value)
    }
  }, [dataGetValueGiftCard])

  const handleCloseAlert = () => {
    setShowAlert(ShowAlertOptions.notShow)
  }

  function validationValue() {
    if (addValueGiftCard === undefined) {
      setValidation(intl.formatMessage(provider.missingValue))
      setBorderRed(true)

      return false
    }

    if (parseFloat(addValueGiftCard) <= 0) {
      setValidation(intl.formatMessage(provider.negativeValue))
      setBorderRed(true)

      return false
    }

    if (parseFloat(addValueGiftCard) > credit) {
      setValidation(
        intl.formatMessage(provider.biggerThanCouldBe) +
          credit.toLocaleString('pt-br', { minimumFractionDigits: 2 })
      )
      setBorderRed(true)

      return false
    }

    setBorderRed(false)

    return true
  }

  async function updateGiftCardFunction() {
    setLoading(true)
    setShowAlert(ShowAlertOptions.notShow)
    const valid = validationValue()

    if (valid) {
      const { data } = await updateGiftCardMutation({
        variables: {
          value: parseFloat(addValueGiftCard as string),
        },
      })

      if (data.updateGiftCard === 'success') {
        setRescue(parseFloat(addValueGiftCard as string))
        setShowAlert(ShowAlertOptions.alertSave)
        refetchGetValueGiftCard()
        refetchValueAlreadyInGiftCard()
        setAddValueGiftCard('0')
      } else {
        setShowAlert(ShowAlertOptions.alertError)
      }

      setLoading(false)
    }

    setLoading(false)
  }

  function copyCode() {
    setLoadingCode(true)
    setShowAlert(ShowAlertOptions.notShow)

    if (!navigator.clipboard) {
      setShowAlert(ShowAlertOptions.alertCopyError)
      setLoadingCode(false)

      return
    }

    navigator.clipboard.writeText(code)
    setShowAlert(ShowAlertOptions.alertCopySuccess)
    setLoadingCode(false)
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
        showAlert,
        setShowAlert,
        handleCloseAlert,
        credit,
        copyCode,
        loading,
        loadingCode,
        rescue,
        borderRed,
        setBorderRed,
      }}
    >
      {props.children}
    </ContextStore.Provider>
  )
}

export default ProviderStore
