import { TOKEN_NAME } from 'environment'
import { useRouter } from 'next/router'
import { createContext, FC, useContext, useEffect, useState } from 'react'
import IUser from 'types/user'
import axios from 'services/axios.client'

import { IAuthContext } from './types'

export const AuthContext = createContext<IAuthContext>({
    isAuth: false,
    login: () => undefined,
    logout: () => undefined,
    loading: true,
    refreshUser: () => undefined,
})

export const useAuthContext = () => useContext(AuthContext)

const AuthProvider: FC = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState<IUser>()
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const isLogin = () => {
        if (typeof window !== 'undefined') {
            setIsAuth(!!window.localStorage.getItem(TOKEN_NAME))
        }
    }

    const getUserInfo = async () => {
        setLoading(true)
        await axios()
            .get('/users/profile')
            .then((res) => res.data)
            .then((res) => {
                setUser(res)
            })
            .catch(() => {
                logout()
            }).finally(() => {
                setLoading(false)
            })
    }

    const login = (token: string, user: IUser) => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(TOKEN_NAME, token)
            setIsAuth(true)
            setUser(user)
        }
    }

    const logout = () => {
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem(TOKEN_NAME)
            setIsAuth(false)
            setUser(undefined)
            router.push('/login')
        }
    }

    useEffect(() => {
        isLogin()
    }, [])

    useEffect(() => {
        if (isAuth && !user) {
            getUserInfo()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth])

    return (
        <AuthContext.Provider
            value={{
                isAuth,
                user,
                loading,
                login,
                logout,
                refreshUser: getUserInfo,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
