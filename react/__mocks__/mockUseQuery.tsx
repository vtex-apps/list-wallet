import updateGiftCard from '../queries/updateGiftCard.gql'
import getValueTotalList from '../queries/getValueTotalList.gql'
import getRouteRedemptionCode from '../queries/getRouteRedemptionCode.gql'
import getValueGiftCard from '../queries/getValueGiftCard.gql'
import getValueAlreadyInGiftCard from '../queries/getValueAlreadyInGiftCard.gql'

let queryCalled = false
let queryCalledGiftCard = false
let queryCodeCalled = false

export const mocks = [
  {
    request: {
      query: getRouteRedemptionCode,
    },
    result: {
      data: {
        getRouteRedemptionCode: 'code',
      },
    },
  },
  {
    request: {
      query: getValueGiftCard,
    },
    result: {
      data: {
        getValueGiftCard: 10,
      },
    },
  },
  {
    request: {
      query: getValueAlreadyInGiftCard,
    },
    result: {
      data: {
        getValueAlreadyInGiftCard: 5,
      },
    },
  },
  {
    request: {
      query: updateGiftCard,
      variables: {
        value: 5,
      },
    },
    result: {
      data: {
        updateGiftCard: 'sucess',
      },
    },
  },
  {
    request: {
      query: getValueTotalList,
    },
    result: {
      data: {
        getValueTotalList: 1000,
      },
    },
  },
]

export const mocksUpdate = [
  {
    request: {
      query: getRouteRedemptionCode,
    },
    result: {
      data: {
        getRouteRedemptionCode: 'code',
      },
    },
  },
  {
    request: {
      query: getValueGiftCard,
    },
    newData: () => {
      if (queryCalled) {
        return {
          data: {
            getValueGiftCard: 5,
          },
        }
      }

      queryCalled = true

      return {
        data: {
          getValueGiftCard: 10,
        },
      }
    },
  },
  {
    request: {
      query: getValueAlreadyInGiftCard,
    },
    newData: () => {
      if (queryCalledGiftCard) {
        return {
          data: {
            getValueAlreadyInGiftCard: 0,
          },
        }
      }

      queryCalledGiftCard = true

      return {
        data: {
          getValueAlreadyInGiftCard: 5,
        },
      }
    },
  },
  {
    request: {
      query: updateGiftCard,
      variables: {
        value: 5,
      },
    },
    result: {
      data: {
        updateGiftCard: 'success',
      },
    },
  },
  {
    request: {
      query: getValueTotalList,
    },
    result: {
      data: {
        getValueTotalList: 1000,
      },
    },
  },
]

export const mocksUpdateReturnError = [
  {
    request: {
      query: getRouteRedemptionCode,
    },
    result: {
      data: {
        getRouteRedemptionCode: 'code',
      },
    },
  },
  {
    request: {
      query: getValueGiftCard,
    },
    result: {
      data: {
        getValueGiftCard: 10,
      },
    },
  },
  {
    request: {
      query: getValueAlreadyInGiftCard,
    },
    result: {
      data: {
        getValueAlreadyInGiftCard: 5,
      },
    },
  },
  {
    request: {
      query: updateGiftCard,
      variables: {
        value: 5,
      },
    },
    result: {
      data: {
        updateGiftCard: 'failed',
      },
    },
  },
  {
    request: {
      query: getValueTotalList,
    },
    result: {
      data: {
        getValueTotalList: 1000,
      },
    },
  },
]

export const mocksErrorCode = [
  {
    request: {
      query: getRouteRedemptionCode,
    },
    result: {
      data: {
        getRouteRedemptionCode: 'failed',
      },
    },
  },
  {
    request: {
      query: getValueGiftCard,
    },
    result: {
      data: {
        getValueGiftCard: 10,
      },
    },
  },
  {
    request: {
      query: getValueAlreadyInGiftCard,
    },
    result: {
      data: {
        getValueAlreadyInGiftCard: 5,
      },
    },
  },
  {
    request: {
      query: updateGiftCard,
      variables: {
        value: 5,
      },
    },
    result: {
      data: {
        updateGiftCard: 'success',
      },
    },
  },
  {
    request: {
      query: getValueTotalList,
    },
    result: {
      data: {
        getValueTotalList: 1000,
      },
    },
  },
]

export const mocksUpdateWithoutCode = [
  {
    request: {
      query: getRouteRedemptionCode,
    },
    newData: () => {
      if (queryCodeCalled) {
        return {
          data: {
            getRouteRedemptionCode: 'code',
          },
        }
      }

      queryCodeCalled = true

      return {
        data: {
          getRouteRedemptionCode: undefined,
        },
      }
    },
  },
  {
    request: {
      query: getValueGiftCard,
    },
    newData: () => {
      if (queryCalled) {
        return {
          data: {
            getValueGiftCard: 10,
          },
        }
      }

      queryCalled = true

      return {
        data: {
          getValueGiftCard: 15,
        },
      }
    },
  },
  {
    request: {
      query: getValueAlreadyInGiftCard,
    },
    newData: () => {
      if (queryCalledGiftCard) {
        return {
          data: {
            getValueAlreadyInGiftCard: 5,
          },
        }
      }

      queryCalledGiftCard = true

      return {
        data: {
          getValueAlreadyInGiftCard: 10,
        },
      }
    },
  },
  {
    request: {
      query: updateGiftCard,
      variables: {
        value: 5,
      },
    },
    result: {
      data: {
        updateGiftCard: 'success',
      },
    },
  },
  {
    request: {
      query: getValueTotalList,
    },
    result: {
      data: {
        getValueTotalList: 1000,
      },
    },
  },
]
