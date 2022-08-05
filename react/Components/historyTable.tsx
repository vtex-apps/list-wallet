import type { FC } from 'react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { Table } from 'vtex.styleguide'
import { useStore } from '../hooks/useStore'
import { historyMessages } from '../utils/definedMessages'

const HistoryTable: FC = () => {
    const intl = useIntl()
    const { history } = useStore()
    const items = [
        {
            value: 3000,
            description: "Teste",
            date: Date.now()
        }
    ]

    const defaultSchema = {
        properties: {
            value: {
                title: 'Valor',
                width: 80,
            },
            description: {
                title: 'Descrição',
                minWidth: 80,
            },
            date: {
                title: 'Data',
                minWidth: 80,
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
