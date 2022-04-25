export interface IUserFund {
    fundId: string
    fundName: string
    balance: number
    status: string
    _id: string
}

export interface IUserTransaction {
    _id: string
    fundName: string
    fundId: string
    date: string
    amount: number
    type: 'cancellation' | 'opening'
}

export default interface IUser {
    username: string
    name: string
    lastName: string
    balance: number
}
