import { IUserFund, IUserTransaction } from 'types/user'

export interface IDashboardPropsView {
    transactions: IUserTransaction[]
    userFunds: IUserFund[]
}
