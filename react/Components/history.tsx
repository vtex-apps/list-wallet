import type { FC } from 'react'
import React from 'react'
import { useIntl } from 'react-intl'
import { Spinner, Button, Modal } from 'vtex.styleguide'

import { useStore } from '../hooks/useStore'

const History: FC = () => {
    const intl = useIntl()

    const {
        history,
        loadingHistory
    } = useStore()

    return (
        <span className="ml3">
            {loadingHistory ? (
                <Spinner color="currentColor" size={20} />
            ) : (
                <Button variation="tertiary" size="small">Extrato2</Button>
            )}
        </span>
    )
}

export default History
