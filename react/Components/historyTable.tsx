import type { FC } from 'react'
import React, { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { History } from 'vtex.gift-card-list'
import { Table, Tag } from 'vtex.styleguide'

import { useStore } from '../hooks/useStore'
import { historyMessages } from '../utils/definedMessages'

const HistoryTable: FC = () => {
    const intl = useIntl()
    const { history } = useStore()

    const [tableOrder, setTableOrder] = useState({
        orderedItems: history,
        dataSort: {
            sortedBy: 'dateAndTime',
            sortOrder: 'DESC',
        }
    })

    const [tablePage, setTablePage] = useState({
        tableLenght: 5,
        currentPage: 1,
        slicedData: tableOrder.orderedItems.slice(0, 5),
        currentItemFrom: 1,
        currentItemTo: 5,
        itemsLength: tableOrder.orderedItems.length,
    })

    useEffect(() => {
        setTablePage({
            tableLenght: 5,
            currentPage: 1,
            slicedData: tableOrder.orderedItems.slice(0, 5),
            currentItemFrom: 1,
            currentItemTo: 5,
            itemsLength: tableOrder.orderedItems.length,
        })
    }, [tableOrder])

    const handleSort = ({ sortOrder, sortedBy }: { sortOrder: string, sortedBy: string }) => {
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

    const handleNextClick = () => {
        const newPage = tablePage.currentPage + 1
        const itemFrom = tablePage.currentItemTo + 1
        const itemTo = tablePage.tableLenght * newPage
        const data = tableOrder.orderedItems.slice(itemFrom - 1, itemTo)
        goToPage(newPage, itemFrom, itemTo, data)
    }

    const handlePrevClick = () => {
        if (tablePage.currentPage === 0) return
        const newPage = tablePage.currentPage - 1
        const itemFrom = tablePage.currentItemFrom - tablePage.tableLenght
        const itemTo = tablePage.currentItemFrom - 1
        const data = tableOrder.orderedItems.slice(itemFrom - 1, itemTo)
        goToPage(newPage, itemFrom, itemTo, data)
    }

    const goToPage = (currentPage: number, currentItemFrom: number, currentItemTo: number, slicedData: History[]) => {
        setTablePage({
            tableLenght: tablePage.tableLenght,
            currentPage,
            slicedData,
            currentItemFrom,
            currentItemTo,
            itemsLength: tablePage.itemsLength
        })
    }

    const defaultSchema = {
        properties: {
            dateAndTime: {
                title: intl.formatMessage(historyMessages.dateTitle),
                minWidth: 80,
                width: 180,
                sortable: true
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
                        <Tag type={cellData ? "success" : "error"}><span className="nowrap">{cellData ? intl.formatMessage(historyMessages.creditStatus) : intl.formatMessage(historyMessages.debitStatus)}</span></Tag>
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
                emptyStateLabel={intl.formatMessage(historyMessages.emptyHistoryTitle)}
                emptyStateChildren={
                  
                        <p>
                            {intl.formatMessage(historyMessages.emptyHistoryMessage)}
                        </p>
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
            />
        </div>
    )
}

export default HistoryTable
