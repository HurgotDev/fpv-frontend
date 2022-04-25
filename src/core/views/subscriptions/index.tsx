import { Button, Divider, Space, Table } from 'antd'
import Input from 'core/common/Input'
import Select from 'core/common/Select'
import numeral from 'numeral'
import { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

import { ISubscriptionsPropsView } from './types'

const Subscriptions: FC<ISubscriptionsPropsView> = ({ handleSubmit, unsubscribe, funds, userFunds }) => {
    const { control, handleSubmit: onSubmit } = useFormContext<{ fundId: string; amount: number }>()

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Monto mínimo para vincularse',
            dataIndex: 'minAmount',
            key: 'minAmount',
            render: (v: number) => numeral(v).format('$ 0,0'),
        },
        {
            title: 'Categoría',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Vinculado',
            dataIndex: '_id',
            key: '_id',
            render: (v: string) => {
                if (userFunds.find((it) => it.fundId === v)) {
                    return (
                        <>
                            <CheckCircleOutlined style={{ fontSize: 20, color: 'green' }} />
                            <Button type="link" onClick={() => unsubscribe(v)}>
                                Desvincularse
                            </Button>
                        </>
                    )
                }

                return <CloseCircleOutlined style={{ fontSize: 20, color: 'red' }} />
            },
        },
    ]

    return (
        <div>
            <h2>Vincularse a un nuevo fondo</h2>
            <Divider />

            <form onSubmit={onSubmit(handleSubmit)}>
                <Space align="end" direction="horizontal" size="large">
                    <Select
                        control={control}
                        label="Fondo"
                        name="fundId"
                        options={funds.map((it) => ({ key: it._id, value: it.name }))}
                        placeholder="Seleccione un fondo..."
                        width="300px"
                    />
                    <Input control={control} label="Monto a invertir" name="amount" />
                    <Button htmlType="submit" type="primary">
                        Vincularse
                    </Button>
                </Space>
            </form>

            <Divider />

            <h3>Fondos disponibles</h3>

            <div>
                <Table columns={columns} dataSource={funds} />
            </div>
        </div>
    )
}

export default Subscriptions
