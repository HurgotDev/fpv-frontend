import { Button, Divider, Table, Tag } from 'antd'
import moment from 'moment'
import numeral from 'numeral'
import { FC, useRef } from 'react'
import React from 'react'
import { Chart as ChartJS, ArcElement, Legend, Tooltip, Title } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { useAuthContext } from 'src/context/login'
import { useReactToPrint } from 'react-to-print'

import { IDashboardPropsView } from './types'
import { BarWrapper } from './components/styled'

ChartJS.register(ArcElement, Tooltip, Legend, Title)

const TRANSACTIONS_TYPES = {
    cancellation: 'Cancelación',
    opening: 'Apertura',
}

const Dashboard: FC<IDashboardPropsView> = ({ transactions, userFunds }) => {
    const { user } = useAuthContext()
    const tableRef = useRef<any>()

    const handleExport = useReactToPrint({
        content: () => tableRef.current,
    })

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Tipo de operación',
            dataIndex: 'type',
            key: 'type',
            render: (v: keyof typeof TRANSACTIONS_TYPES) => {
                return <Tag color={v === 'cancellation' ? 'error' : 'success'}>{TRANSACTIONS_TYPES[v]}</Tag>
            },
        },
        {
            title: 'Fondo',
            dataIndex: 'fundName',
            key: 'fundName',
        },
        {
            title: 'Monto',
            dataIndex: 'amount',
            key: 'amount',
            render: (v: number) => numeral(v).format('$ 0,0'),
        },
        {
            title: 'Fecha',
            dataIndex: 'date',
            key: 'date',
            render: (v: string) => {
                return moment(v).format('DD-MM-YYYY HH:mm:ss')
            },
        },
    ]

    return (
        <div>
            <h2>Panel de control</h2>
            <Divider />

            <BarWrapper>
                <Pie
                    data={{
                        labels: userFunds.map((it) => it.fundName).concat('BALANCE'),
                        datasets: [
                            {
                                label: 'Fondos',
                                data: userFunds.map((it) => it.balance).concat([user?.balance || 0]),
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                ],
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Mis inversiones',
                            },
                        },
                    }}
                />
            </BarWrapper>

            <Divider />

            <div>
                <Button danger style={{ float: 'right' }} type="primary" onClick={handleExport}>
                    Descargar reporte
                </Button>
                <div ref={tableRef} style={{ marginTop: 10 }}>
                    <h3>Mis transacciones</h3>
                    <Table columns={columns} dataSource={transactions} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
