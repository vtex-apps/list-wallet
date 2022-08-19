import type { FC } from 'react'
import React, { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { Table, Tag, DatePicker, Dropdown } from 'vtex.styleguide'

import { useStore } from '../hooks/useStore'
import { historyMessages } from '../utils/definedMessages'

const TABLE_LENGTH = 5
const INITIAL_PAGE = 1
const ITEM_FROM = 1
const ITEM_TO = 5

const HistoryTable: FC = () => {
  const intl = useIntl()
  const { history, setFilterHistory, loadingGetRouteHistory } = useStore()

  const [tableOrder, setTableOrder] = useState({
    orderedItems: history,
    dataSort: {
      sortedBy: 'dateAndTime',
      sortOrder: 'DESC',
    },
  })

  const options = [
    { value: 'all', label: intl.formatMessage(historyMessages.filterAll) },
    { value: 'deposits', label: intl.formatMessage(historyMessages.filterStatusCredit) },
    { value: 'withdrawals', label: intl.formatMessage(historyMessages.filterStatusDebit) },
  ]

  const [tablePage, setTablePage] = useState({
    tableLength: TABLE_LENGTH,
    currentPage: INITIAL_PAGE,
    slicedData: tableOrder.orderedItems.slice(0, 5),
    currentItemFrom: ITEM_FROM,
    currentItemTo: ITEM_TO,
    itemsLength: tableOrder.orderedItems.length,
    filterStatements: [],
  })

  useEffect(() => {
    setTablePage({
      tableLength: TABLE_LENGTH,
      currentPage: INITIAL_PAGE,
      slicedData: tableOrder.orderedItems.slice(0, 5),
      currentItemFrom: ITEM_FROM,
      currentItemTo: ITEM_TO,
      itemsLength: tableOrder.orderedItems.length,
      filterStatements: tablePage.filterStatements,
    })
  }, [tableOrder])

  useEffect(() => {
    setTableOrder({
      orderedItems: history,
      dataSort: {
        sortedBy: 'dateAndTime',
        sortOrder: 'DESC',
      },
    })
  }, [history])

  const handleSort = ({
    sortOrder,
    sortedBy,
  }: {
    sortOrder: string
    sortedBy: string
  }) => {
    if (sortedBy === 'dateAndTime') {
      const orderedItems = tableOrder.orderedItems.reverse()

      setTableOrder({
        orderedItems,
        dataSort: {
          sortedBy,
          sortOrder,
        },
      })
    }
  }

  const goToPage = (
    currentPage: number,
    currentItemFrom: number,
    currentItemTo: number,
    slicedData: TableHistory[]
  ) => {
    setTablePage({
      tableLength: tablePage.tableLength,
      currentPage,
      slicedData,
      currentItemFrom,
      currentItemTo,
      itemsLength: tablePage.itemsLength,
      filterStatements: tablePage.filterStatements,
    })
  }

  const handleNextClick = () => {
    const newPage = tablePage.currentPage + 1
    const itemFrom = tablePage.currentItemTo + 1
    const itemTo = tablePage.tableLength * newPage
    const data = tableOrder.orderedItems.slice(itemFrom - 1, itemTo)

    goToPage(newPage, itemFrom, itemTo, data)
  }

  const handlePrevClick = () => {
    if (tablePage.currentPage === 0) return
    const newPage = tablePage.currentPage - 1
    const itemFrom = tablePage.currentItemFrom - tablePage.tableLength
    const itemTo = tablePage.currentItemFrom - 1
    const data = tableOrder.orderedItems.slice(itemFrom - 1, itemTo)

    goToPage(newPage, itemFrom, itemTo, data)
  }

  const DatePickerObject = ({
    value,
    onChange,
  }: {
    value: any
    onChange: any
  }) => {
    return (
      <div className="w-100">
        <DatePicker
          value={value || new Date()}
          onChange={(date: any) => {
            onChange(date)
          }}
          locale="pt-BR"
        />
      </div>
    )
  }

  const DatePickerRangeObject = ({
    value,
    onChange,
  }: {
    value: any
    onChange: any
  }) => {
    return (
      <div className="flex flex-column w-100">
        <DatePicker
          value={value?.from || new Date(Date.now() - 86400000)}
          onChange={(date: any) => {
            const dateFrom = { from: date, to: value?.to }

            onChange(dateFrom)
          }}
          locale="pt-BR"
          maxDate={value?.to || new Date()}
        />
        <br />
        <DatePicker
          value={value?.to || new Date()}
          onChange={(date: any) => {
            const dateTo = { from: value?.from, to: date }

            onChange(dateTo)
          }}
          locale="pt-BR"
          minDate={value?.from || new Date(Date.now() - 86400000)}
          maxDate={new Date()}
        />
        <br />
      </div>
    )
  }

  const StatusSelectorObject = ({
    value,
    onChange,
  }: {
    value: any
    onChange: any
  }) => {
    return (
      <div>
        <Dropdown
          label={intl.formatMessage(historyMessages.filterStatus)}
          size="small"
          options={options}
          value={value}
          onChange={(_: any, v: any) => {
            onChange(v)
          }}
        />
      </div>
    )
  }

  const handleFiltersChange = async (statements: any) => {
    if (statements.length === 0) {
      setFilterHistory(undefined)
    } else {
      let status
      let dateAndTime

      await statements.forEach((filters: any) => {
        if (filters.subject === 'status') {
          if (filters.object === 'deposits') {
            status = true
          } else if (filters.object === 'withdrawals') {
            status = false
          }
        }

        if (filters.subject === 'date' && filters.verb === '=') {
          const start = new Date(
            new Date(filters.object).setHours(0, 0, 0, 0)
          ).toISOString()

          const end = new Date(
            new Date(filters.object).setHours(23, 59, 59, 9)
          ).toISOString()

          dateAndTime = { startDate: start, endDate: end }
        } else if (filters.subject === 'date' && filters.verb === 'between') {
          const start = new Date(
            new Date(filters.object?.from ?? Date.now() - 86400000).setHours(
              0,
              0,
              0,
              0
            )
          ).toISOString()

          const end = new Date(
            new Date(filters.object?.to ?? Date.now()).setHours(23, 59, 59, 9)
          ).toISOString()

          dateAndTime = { startDate: start, endDate: end }
        }
      })

      setFilterHistory({ status, dateAndTime })
    }

    setTablePage({
      tableLength: TABLE_LENGTH,
      currentPage: INITIAL_PAGE,
      slicedData: tableOrder.orderedItems.slice(0, 5),
      currentItemFrom: ITEM_FROM,
      currentItemTo: ITEM_TO,
      itemsLength: tableOrder.orderedItems.length,
      filterStatements: statements,
    })
  }

  const defaultSchema = {
    properties: {
      dateAndTime: {
        title: intl.formatMessage(historyMessages.dateTitle),
        minWidth: 80,
        width: 180,
        sortable: true,
      },
      description: {
        title: intl.formatMessage(historyMessages.descriptionTitle),
        width: 300,
        minWidth: 280,
      },
      value: {
        title: intl.formatMessage(historyMessages.valueTitle),
        width: 100,
      },
      status: {
        title: intl.formatMessage(historyMessages.statusTitle),
        minWidth: 80,
        width: 170,
        cellRenderer: ({ cellData }: { cellData: boolean }) => {
          return (
            <Tag type={cellData ? 'success' : 'error'}>
              <span className="nowrap">
                {cellData
                  ? intl.formatMessage(historyMessages.creditStatus)
                  : intl.formatMessage(historyMessages.debitStatus)}
              </span>
            </Tag>
          )
        },
      },
    },
  }

  return (
    <div className="mb5 mt5">
      <Table
        fullWidth
        schema={defaultSchema}
        items={tablePage.slicedData}
        density="low"
        loading={loadingGetRouteHistory}
        emptyStateLabel={intl.formatMessage(historyMessages.emptyHistoryTitle)}
        emptyStateChildren={
          <>
            <p>{intl.formatMessage(historyMessages.emptyHistoryMessage)}</p>
          </>
        }
        onSort={handleSort}
        sort={{
          sortedBy: tableOrder.dataSort.sortedBy,
          sortOrder: tableOrder.dataSort.sortOrder,
        }}
        pagination={{
          onNextClick: handleNextClick,
          onPrevClick: handlePrevClick,
          currentItemFrom: tablePage.currentItemFrom,
          currentItemTo: tablePage.currentItemTo,
          textOf: intl.formatMessage(historyMessages.paginationOf),
          totalItems: tablePage.itemsLength,
        }}
        filters={{
          alwaysVisibleFilters: ['date', 'status'],
          statements: tablePage.filterStatements,
          onChangeStatements: handleFiltersChange,
          clearAllFiltersButtonLabel: intl.formatMessage(historyMessages.filterClear),
          collapseLeft: true,
          options: {
            date: {
              label: intl.formatMessage(historyMessages.filterDate),
              renderFilterLabel: (st: {
                object: { from: any; to: any } | any
                verb: string
              }) => {
                if (!st || !st.object) {
                  return intl.formatMessage(historyMessages.filterAll)
                }

                return `${st.verb === 'between'
                  ? `${intl.formatMessage(historyMessages.filterBetween)} ${new Date(
                    st.object.from
                  ).toLocaleDateString()} ${intl.formatMessage(historyMessages.filterAnd)} ${new Date(
                    st.object.to
                  ).toLocaleDateString()}`
                  : `${intl.formatMessage(historyMessages.filterIs)} ${new Date(st.object).toLocaleDateString()}`
                  }`
              },
              verbs: [
                {
                  label: intl.formatMessage(historyMessages.filterIs),
                  value: '=',
                  object: (props: any) => <DatePickerObject {...props} />,
                },
                {
                  label: intl.formatMessage(historyMessages.filterBetween),
                  value: 'between',
                  object: (props: any) => <DatePickerRangeObject {...props} />,
                },
              ],
            },
            status: {
              label: intl.formatMessage(historyMessages.filterStatus),
              renderFilterLabel: (st: any) => {
                if (!st || !st.object) {
                  return intl.formatMessage(historyMessages.filterAll)
                }

                const retorno = options.find(
                  (filter) => filter.value === st.object
                )

                return retorno?.label
              },
              verbs: [
                {
                  value: 'includes',
                  object: (props: any) => <StatusSelectorObject {...props} />,
                },
              ],
            },
          },
        }}
      />
    </div>
  )
}

export default HistoryTable
