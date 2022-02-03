import React from 'react'
import { PageHeader } from 'vtex.styleguide'

import './styles.global.css'
import ProviderStore from './provider/providerStore'
import CollapsibleArea from './Components/collapsibleArea'

const WalletList: StorefrontFunctionComponent = () => {
  return (
    <ProviderStore>
      <div className="bg-muted-5">
        <PageHeader
          title={
            <div className="padding-pageheader">
              <div>
                <CollapsibleArea />
              </div>
            </div>
          }
        />
      </div>
    </ProviderStore>
  )
}

export default WalletList
