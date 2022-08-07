import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import { useIntl } from 'react-intl'

import { provider, titles, historyMessages } from '../utils/definedMessages'
import updateGiftCard from '../queries/updateGiftCard.gql'
import getValueTotalList from '../queries/getValueTotalList.gql'
import getRouteRedemptionCode from '../queries/getRouteRedemptionCode.gql'
import getValueGiftCard from '../queries/getValueGiftCard.gql'
import getValueAlreadyInGiftCard from '../queries/getValueAlreadyInGiftCard.gql'
import getRouteHistory from '../queries/getRouteHistory.gql'
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
  const [history, setHistory] = useState<TableHistory[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingCode, setLoadingCode] = useState(false)
  const [isGiftCardFieldInvalid, setIsGiftCardFieldInvalid] = useState(false)
  const [loadingGiftCard, setLoadingGiftCard] = useState(false)
  const [loadingRedemptionCode, setLoadingRedemptionCode] = useState(false)
  const [loadingCredit, setLoadingCredit] = useState(false)
  const [loadingHistory, setLoadingHistory] = useState(false)

  const [updateGiftCardMutation] = useMutation(updateGiftCard)
  const { data: dataValueTotalList } = useQuery(getValueTotalList)

  const {
    data: dataRedemptionCode,
    refetch: refetchGetRedemptionCode,
    loading: loadingRedemptionCodeRoute,
  } = useQuery(getRouteRedemptionCode)

  const {
    data: dataGetValueGiftCard,
    refetch: refetchGetValueGiftCard,
    loading: loadingValueGiftCard,
  } = useQuery(getValueGiftCard)

  const {
    data: dataGetValueAlreadyInGiftCard,
    refetch: refetchValueAlreadyInGiftCard,
    loading: loadingValueAlreadyInGiftCard,
  } = useQuery(getValueAlreadyInGiftCard)

  const {
    data: dataGetRouteHistory,
    refetch: refetchGetRouteHistory,
    loading: loadinGetRouteHistory,
  } = useQuery(getRouteHistory)

  useEffect(() => {
    setLoadingGiftCard(loadingValueGiftCard)
  }, [loadingValueGiftCard])

  useEffect(() => {
    setLoadingCredit(loadingValueAlreadyInGiftCard)
  }, [loadingValueAlreadyInGiftCard])

  useEffect(() => {
    setLoadingRedemptionCode(loadingRedemptionCodeRoute)
  }, [loadingRedemptionCodeRoute])

  useEffect(() => {
    setLoadingHistory(loadingHistory)
  }, [loadingHistory])

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

    if (redemptionCode !== 'failed' && redemptionCode !== undefined) {
      setCode(redemptionCode)
    }
  }, [dataRedemptionCode])

  useEffect(() => {
    const value = dataGetValueGiftCard?.getValueGiftCard

    if (value !== undefined) {
      setValueGiftCard(value)
    }
  }, [dataGetValueGiftCard])

  useEffect(() => {
    const getHistory = dataGetRouteHistory?.getRouteHistory

    if (getHistory !== undefined) {
      let tableHistory: TableHistory[] = []
      let options = {
        timeZone: "UTC",
        year: 'numeric' as "numeric",
        month: 'short' as "short",
        day: 'numeric' as "numeric"
      }
      tableHistory = getHistory.map((item: { value: number; dateAndTime: string }) => {
        return {
          value: intl.formatMessage(titles.money) + Math.abs(item.value / 100).toLocaleString('pt-br', { minimumFractionDigits: 2 }),
          description: item.value > 0 ? intl.formatMessage(historyMessages.creditDescription) : intl.formatMessage(historyMessages.debitDescription),
          dateAndTime: new Date(item.dateAndTime).toLocaleString("pt-BR", options),
          status: item.value > 0 ? true : false
        }
      })
      setHistory(tableHistory.reverse())
    }
  }, [dataGetRouteHistory])

  const handleCloseAlert = () => {
    setShowAlert(ShowAlertOptions.notShow)
  }

  function validationValue() {
    if (addValueGiftCard === undefined) {
      setValidation(intl.formatMessage(provider.missingValue))
      setIsGiftCardFieldInvalid(true)

      return false
    }

    if (parseFloat(addValueGiftCard) <= 0) {
      setValidation(intl.formatMessage(provider.negativeValue))
      setIsGiftCardFieldInvalid(true)

      return false
    }

    if (parseFloat(addValueGiftCard) > credit) {
      setValidation(
        intl.formatMessage(provider.biggerThanCouldBe) +
        credit.toLocaleString('pt-br', { minimumFractionDigits: 2 })
      )
      setIsGiftCardFieldInvalid(true)

      return false
    }

    setIsGiftCardFieldInvalid(false)

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
        if (code === intl.formatMessage(provider.withoutCode)) {
          const interval = setInterval(async () => {
            const updateGetRedemptionCode = await refetchGetRedemptionCode()
            const updateGetValueGiftCard = await refetchGetValueGiftCard()
            const updateValueAlreadyInGiftCard =
              await refetchValueAlreadyInGiftCard()

            if (
              updateGetRedemptionCode?.data?.getRouteRedemptionCode !==
              'failed' &&
              updateGetValueGiftCard?.data?.getValueGiftCard > 0 &&
              updateValueAlreadyInGiftCard?.data?.getValueAlreadyInGiftCard > 0
            ) {
              clearInterval(interval)

              setRescue(parseFloat(addValueGiftCard as string))
              setShowAlert(ShowAlertOptions.alertSave)
              setAddValueGiftCard('0')
              setLoading(false)
            }
          }, 2000)

          return
        }

        refetchGetValueGiftCard()
        refetchValueAlreadyInGiftCard()
        setRescue(parseFloat(addValueGiftCard as string))
        setShowAlert(ShowAlertOptions.alertSave)
        setAddValueGiftCard('0')
      } else {
        setShowAlert(ShowAlertOptions.alertError)
      }

      setLoading(false)

      return
    }

    setLoading(false)
  }

  function copyCode() {
    setLoadingCode(true)
    setShowAlert(ShowAlertOptions.notShow)

    if (code === intl.formatMessage(provider.withoutCode)) {
      setShowAlert(ShowAlertOptions.alertWithoutCode)
      setLoadingCode(false)

      return
    }

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
        history,
        copyCode,
        loading,
        loadingCode,
        rescue,
        isGiftCardFieldInvalid,
        setIsGiftCardFieldInvalid,
        loadingGiftCard,
        loadingCredit,
        loadingRedemptionCode,
        loadingHistory
      }}
    >
      {props.children}
    </ContextStore.Provider>
  )
}

export default ProviderStore
