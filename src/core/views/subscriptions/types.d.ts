import IFund from 'types/fund'
import { IUserFund } from 'types/user'

export interface ISubscriptionsPropsView {
    handleSubmit: (data: { fundId: string; amount: number }) => void
    unsubscribe: (fundId: string) => void
    funds: IFund[]
    userFunds: IUserFund[]
}
