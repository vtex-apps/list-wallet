import React from 'react'
import { useIntl } from 'react-intl'
import { PageHeader } from 'vtex.styleguide'

import CollapsibleArea from './components/collapsibleArea'
import './styles.global.css'
import { wallet } from './utils/definedMessages'
import ProviderStore from './provider/providerStore'

const WalletList: StorefrontFunctionComponent = () => {
  const intl = useIntl()

  return (
    <ProviderStore>
      <div className="bg-muted-5">
        <PageHeader
          title={
            <>
              <div className="display">
                <div className="padding-pageheader">
                  {intl.formatMessage(wallet.title)}
                </div>
              </div>
              <CollapsibleArea />
            </>
          }
        />
      </div>
    </ProviderStore>
  )
}

export default WalletList
