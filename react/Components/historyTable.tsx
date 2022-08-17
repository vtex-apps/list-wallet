import type { FC } from 'react'
import React, { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { History } from 'vtex.gift-card-list'
import { Table, Tag, DatePicker, Checkbox } from 'vtex.styleguide'

import { useStore } from '../hooks/useStore'
import { historyMessages } from '../utils/definedMessages'

const HistoryTable: FC = () => {
    const intl = useIntl()
    const { history, setFilterHistory } = useStore()

    const [tableOrder, setTableOrder] = useState({
        orderedItems: history,
        dataSort: {
            sortedBy: 'dateAndTime',
            sortOrder: 'DESC',
        }
    })

    const [tablePage, setTablePage] = useState({
        tableLength: 5,
        currentPage: 1,
        slicedData: tableOrder.orderedItems.slice(0, 5),
        currentItemFrom: 1,
        currentItemTo: 5,
        itemsLength: tableOrder.orderedItems.length,
        filterStatements: []
    })

    useEffect(() => {
        setTablePage({
            tableLength: 5,
            currentPage: 1,
            slicedData: tableOrder.orderedItems.slice(0, 5),
            currentItemFrom: 1,
            currentItemTo: 5,
            itemsLength: tableOrder.orderedItems.length,
            filterStatements: tablePage.filterStatements
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

    const goToPage = (currentPage: number, currentItemFrom: number, currentItemTo: number, slicedData: TableHistory[]) => {
        setTablePage({
            tableLength: tablePage.tableLength,
            currentPage,
            slicedData,
            currentItemFrom,
            currentItemTo,
            itemsLength: tablePage.itemsLength,
            filterStatements: tablePage.filterStatements
        })
    }

    const DatePickerObject = ({ value, onChange }: { value: any, onChange: any }) => {
        console.log("Value simples:", value)
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

    const DatePickerRangeObject = ({ value, onChange }: { value: any, onChange: any }) => {
        console.log("Value", value)
        console.log("onChange:", onChange)
        return (
            <div className="flex flex-column w-100">
                <DatePicker
                    value={(value?.from) || new Date()}
                    onChange={(dateFrom: any) => {
                        const dataFrom = { from: dateFrom, to: value?.to }
                        console.log("Date from", dataFrom)
                        onChange(dataFrom)
                    }}
                    locale="pt-BR" />
                <br />
                <DatePicker
                    value={(value?.to) || new Date()}
                    onChange={(dateTo: any) => {
                        const dataTo = { from: value?.from, to: dateTo }
                        console.log("Date to", dataTo)
                        onChange(dataTo)
                    }}
                    locale="pt-BR" />
                <br />
            </div>
        )
    }

    const StatusSelectorObject = ({ value, onChange }: { value: any, onChange: any }) => {
        const initialValue = {
            'Entrada': true,
            'Saída': true,
            ...(value || {}),
        }

        const toggleValueByKey = (key: string) => {
            return {
                ...(value || initialValue),
                [key]: value ? !value[key] : false,
            }
        }
        return (
            <div>
                {Object.keys(initialValue).map((opt, index) => {
                    return (
                        <div className="mb3" key={`class-statment-object-${opt}-${index}`}>
                            <Checkbox
                                checked={value ? value[opt] : initialValue[opt]}
                                id={`status-${opt}`}
                                label={opt}
                                name="status-checkbox-group"
                                onChange={() => {
                                    const newValue = toggleValueByKey(`${opt}`)
                                    onChange(newValue)
                                }}
                                value={opt}
                            />
                        </div>
                    )
                })}
            </div>
        )
    }

    const handleFiltersChange = (statements = []) => {
        console.log("Statement:", statements)

        setTablePage({
            tableLength: 5,
            currentPage: 1,
            slicedData: tableOrder.orderedItems.slice(0, 5),
            currentItemFrom: 1,
            currentItemTo: 5,
            itemsLength: tableOrder.orderedItems.length,
            filterStatements: statements
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
                    <>
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
                filters={{
                    alwaysVisibleFilters: ['data', 'status'],
                    statements: [],
                    onChangeStatements: handleFiltersChange,
                    clearAllFiltersButtonLabel: 'Limpar Filtros',
                    collapseLeft: true,
                    options: {
                        data: {
                            label: 'Data',
                            renderFilterLabel: (st: { object: any }) => {
                                if (!st || !st.object) {
                                    return 'Tudo'
                                }
                            },
                            verbs: [
                                {
                                    label: 'é',
                                    value: '=',
                                    object: (props: any) => <DatePickerObject {...props} />,
                                },
                                {
                                    label: 'entre',
                                    value: 'between',
                                    object: (props: any) => <DatePickerRangeObject {...props} />,
                                },
                            ],
                        },
                        status: {
                            label: 'Status',
                            renderFilterLabel: (st: { object: any }) => {
                                if (!st || !st.object) {
                                    return 'Todos'
                                }
                            },
                            verbs: [
                                {
                                    label: 'includes',
                                    value: 'includes',
                                    object: (props: any) => <StatusSelectorObject {...props} />
                                },
                            ],
                        }
                    }
                }}
            />
        </div>
    )
}

export default HistoryTable
