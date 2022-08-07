import type { FC } from 'react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useQuery } from 'react-apollo'

import { Table, Tag } from 'vtex.styleguide'

import { useStore } from '../hooks/useStore'
import { historyMessages } from '../utils/definedMessages'
import getRouteHistory from '../queries/getRouteHistory.gql'


const HistoryTable: FC = () => {
    const intl = useIntl()
    const { history } = useStore()

    const defaultSchema = {
        properties: {
            dateAndTime: {
                title: 'Data',
                minWidth: 80,
            },
            description: {
                title: 'Descrição',
                minWidth: 80,
            },
            value: {
                title: 'Valor',
                width: 100,
            },
            status: {
                title: 'Status',
                minWidth: 80,
                cellRenderer: ({ cellData }: { cellData: boolean }) => {
                    return (
                        <Tag type={cellData ? "success" : "error"}><span className="nowrap">{cellData ? "Entrada" : "Saída"}</span></Tag>
                    )
                },
            },
        },
    }

    return (
        <span>
            <Table
                fullWidth
                schema={defaultSchema}
                items={history}
                density="high"
                emptyStateLabel={intl.formatMessage(historyMessages.emptyHistoryTitle)}
                emptyStateChildren={
                    <>
                        <p>
                            {intl.formatMessage(historyMessages.emptyHistoryMessage)}
                        </p>
                    </>
                }
            />
        </span>
    )
}

export default HistoryTable
