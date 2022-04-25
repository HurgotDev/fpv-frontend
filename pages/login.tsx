import Layout from 'core/layouts/NoAuthLayout'
import { NextPageWithLayout } from 'types/next'
import withLayout from 'src/hocs/withLayout'
import LoginView from 'src/core/views/login'
import { FormProvider, useForm } from 'react-hook-form'
import axios from 'services/axios.client'
import { message } from 'antd'
import { yupResolver } from '@hookform/resolvers/yup'
import { validateLoginForm } from 'validations/login.validations'
import { useAuthContext } from 'src/context/login'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

const Login: NextPageWithLayout = () => {
    const formMethods = useForm({
        resolver: yupResolver(validateLoginForm),
    })

    const { isAuth, login } = useAuthContext()
    const router = useRouter()

    const handleLogin = async (data: { username: string; password: string }) => {
        await axios()
            .post('/auth/login', data)
            .then((res) => res.data)
            .then((res) => {
                login(res.accessToken, res.data)
            })
            .catch((err) => {
                message.error(err?.message || 'Usuario o contraseña incorrecto.')
            })
    }

    useEffect(() => {
        if (isAuth) {
            router.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth])

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <FormProvider {...formMethods}>
                <LoginView handleSubmit={handleLogin} />
            </FormProvider>
        </>
    )
}

export default withLayout(Login, Layout)
