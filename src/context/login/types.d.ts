import IUser from 'types/user'

export interface IAuthContext {
    isAuth: boolean
    user?: IUser
    loading: boolean
    login: (token: string, user: IUser) => void
    logout: () => void
    refreshUser: () => void
}
