import Layout from 'core/layouts/DefaultLayout'
import { NextPageWithLayout } from 'types/next'
import withLayout from 'src/hocs/withLayout'
import Head from 'next/head'
import SubscriptionsView from 'core/views/subscriptions'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { validateSubscriptionsForm } from 'validations/subscriptions.validations'
import axiosClient from 'services/axios.client'
import { useEffect, useState } from 'react'
import IFund from 'types/fund'
import { IUserFund } from 'types/user'
import { message } from 'antd'
import confirm from 'antd/lib/modal/confirm'
import { useAuthContext } from 'src/context/login'

const Subscriptions: NextPageWithLayout = () => {
    const [loading, setLoading] = useState(false)
    const [funds, setFunds] = useState<Array<IFund>>([])
    const [userFunds, setUserFunds] = useState<Array<IUserFund>>([])

    const formMethods = useForm({
        resolver: yupResolver(validateSubscriptionsForm),
    })

    const { refreshUser } = useAuthContext()

    const getUserFunds = async () => {
        return await axiosClient()
            .get('/users/funds')
            .then((res) => res.data)
            .then((res) => res.funds)
    }

    const getFunds = async () => {
        return await axiosClient()
            .get('/funds')
            .then((res) => res.data)
            .then((res) => res.funds)
    }

    const fetchData = async () => {
        if (loading) return
        setLoading(true)
        const [_funds, _userFunds] = await Promise.all([getFunds(), getUserFunds()]).finally(() => setLoading(false))

        setFunds(_funds)
        setUserFunds(_userFunds)
    }

    const unsubscribe = (fundId: string) => {
        confirm({
            title: '¿Seguro que desea desvincularse de este fondo?',
            okText: 'Si, seguro',
            cancelText: 'No, cancelar',
            onOk: async () => {
                await axiosClient()
                    .post(`/funds/${fundId}/cancel-subscription`)
                    .then((res) => res.data)
                    .then((res) => {
                        message.success(res.message)
                        refreshUser()
                        fetchData()
                    })
                    .catch((err) => {
                        message.error(err?.response?.data?.message || 'Algo salió mal')
                    })
            },
        })
    }

    const handleSubmit = async (data: { fundId: string; amount: number }) => {
        await axiosClient()
            .post(`/funds/${data.fundId}/subscribe`, { amount: data.amount })
            .then((res) => res.data)
            .then((res) => {
                message.success(res.message)
                refreshUser()
                fetchData()
                formMethods.reset()
            })
            .catch((err) => {
                message.error(err?.response?.data?.message || 'Algo salió mal')
            })
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Head>
                <title>Aperturas</title>
            </Head>
            <FormProvider {...formMethods}>
                <SubscriptionsView funds={funds} handleSubmit={handleSubmit} unsubscribe={unsubscribe} userFunds={userFunds} />
            </FormProvider>
        </>
    )
}

export default withLayout(Subscriptions, Layout)
