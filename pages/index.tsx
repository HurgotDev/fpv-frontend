import Layout from 'core/layouts/DefaultLayout'
import { NextPageWithLayout } from 'types/next'
import withLayout from 'src/hocs/withLayout'
import Head from 'next/head'
import DashboardView from 'core/views/dashboard'
import axiosClient from 'services/axios.client'
import { useEffect, useState } from 'react'
import { IUserFund, IUserTransaction } from 'types/user'
import { useAuthContext } from 'src/context/login'
import { useRouter } from 'next/router'

const Home: NextPageWithLayout = () => {
    const [transactions, setTransactions] = useState<Array<IUserTransaction>>([])
    const [userFunds, setUserFunds] = useState<Array<IUserFund>>([])
    const [loading, setLoading] = useState(false)

    const { isAuth, loading: loadingAuth } = useAuthContext()
    const router = useRouter()

    const getTransactions = async () => {
        return await axiosClient()
            .get('/users/transactions')
            .then((res) => res.data)
            .then((res) => res.transactions)
    }

    const getUserFunds = async () => {
        return await axiosClient()
            .get('/users/funds')
            .then((res) => res.data)
            .then((res) => res.funds)
    }

    const fetchData = async () => {
        if (loading) return
        setLoading(true)
        const [_transactions, _funds] = await Promise.all([getTransactions(), getUserFunds()]).finally(() => setLoading(false))

        setTransactions(_transactions)
        setUserFunds(_funds)
    }

    useEffect(() => {
        if (isAuth) {
            fetchData()
        } else if (!loading) {
            router.push('/login')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth, loadingAuth])

    return (
        <>
            <Head>
                <title>Inicio | Panel de control</title>
            </Head>
            <DashboardView transactions={transactions} userFunds={userFunds} />
        </>
    )
}

export function getStaticProps() {
    return {
        props: {},
        revalidate: false,
    }
}

export default withLayout(Home, Layout)
