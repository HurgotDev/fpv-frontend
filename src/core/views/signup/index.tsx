import { FC } from 'react'
import { Card, Typography, Space, Button } from 'antd'
import { useFormContext } from 'react-hook-form'
import Link from 'next/link'
import Input from 'core/common/Input'

import { FormWrapper, WrapperLogin } from './components/styled'
import { ISignupPropsView } from './types'

const Login: FC<ISignupPropsView> = ({ handleSubmit }) => {
    const { control, handleSubmit: onSubmit } = useFormContext<{
        username: string
        password: string
        name: string
        lastName: string
    }>()

    return (
        <WrapperLogin>
            <Card title="Regístrate">
                <FormWrapper>
                    <form id="login-form" onSubmit={onSubmit(handleSubmit)}>
                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                            <Input control={control} label="Nombre de usuario" name="username" />
                            <Input control={control} label="Nombres" name="name" />
                            <Input control={control} label="Apellidos" name="lastName" />
                            <Input password control={control} label="Contraseña" name="password" />
                            <Button form="login-form" htmlType="submit" style={{ float: 'right' }} type="primary">
                                Regístrate
                            </Button>
                            <div>
                                <Typography>
                                    ¿Ya tienes una cuenta?&nbsp;
                                    <Link passHref href="/login">
                                        <a>Inicia sesión</a>
                                    </Link>
                                </Typography>
                            </div>
                        </Space>
                    </form>
                </FormWrapper>
            </Card>
        </WrapperLogin>
    )
}

export default Login
