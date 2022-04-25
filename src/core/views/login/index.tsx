import { FC } from 'react'
import { Card, Typography, Space, Button } from 'antd'
import { useFormContext } from 'react-hook-form'
import Link from 'next/link'
import Input from 'core/common/Input'

import { FormWrapper, WrapperLogin } from './components/styled'
import { ILoginPropsView } from './types'

const Login: FC<ILoginPropsView> = ({ handleSubmit }) => {
    const { control, handleSubmit: onSubmit } = useFormContext<{ username: string; password: string }>()

    return (
        <WrapperLogin>
            <Card title="Inicia sesión">
                <FormWrapper>
                    <form id="login-form" onSubmit={onSubmit(handleSubmit)}>
                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                            <Input control={control} label="Nombre de usuario" name="username" />
                            <Input password control={control} label="Contraseña" name="password" />
                            <Button form="login-form" htmlType="submit" style={{ float: 'right' }} type="primary">
                                Iniciar sesión
                            </Button>
                            <div>
                                <Typography>
                                    ¿No tienes una cuenta?&nbsp;
                                    <Link passHref href="/signup">
                                        <a>Regístrate</a>
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
