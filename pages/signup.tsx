import Layout from 'core/layouts/NoAuthLayout'
import { NextPageWithLayout } from 'types/next'
import withLayout from 'src/hocs/withLayout'
import SignupView from 'src/core/views/signup'
import { FormProvider, useForm } from 'react-hook-form'
import axios from 'services/axios.client'
import { message } from 'antd'
import { yupResolver } from '@hookform/resolvers/yup'
import { validateSignupForm } from 'validations/signup.validation'
import { useAuthContext } from 'src/context/login'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

const SignUp: NextPageWithLayout = () => {
    const formMethods = useForm({
        resolver: yupResolver(validateSignupForm),
    })

    const { isAuth, login } = useAuthContext()
    const router = useRouter()

    const handleLogin = async (data: { username: string; password: string; name: string; lastName: string }) => {
        await axios()
            .post('/auth/signup', data)
            .then((res) => res.data)
            .then((res) => {
                login(res.accessToken, res.data)
            })
            .catch((err) => {
                message.error(err?.message || 'No se ha podido registrar.')
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
                <title>Regístrate</title>
            </Head>
            <FormProvider {...formMethods}>
                <SignupView handleSubmit={handleLogin} />
            </FormProvider>
        </>
    )
}

export default withLayout(SignUp, Layout)
