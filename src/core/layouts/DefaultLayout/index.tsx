import React, { FC } from 'react'
// eslint-disable-next-line import/order
import { Layout as AntdLayout, Menu, Button } from 'antd'
const { Sider, Content, Footer } = AntdLayout

import { LogoutOutlined } from '@ant-design/icons'
import Image from 'next/image'
import Link from 'next/link'
import { useAuthContext } from 'src/context/login'
import numeral from 'numeral'

import { Header, WrapperHeader, Brand, ContentWrapper, NavHeaderRight } from './styled'

const Layout: FC = ({ children }) => {
    const { user, logout } = useAuthContext()

    return (
        <AntdLayout style={{ minHeight: '100vh' }}>
            <Header>
                <WrapperHeader>
                    <div>
                        <Brand>
                            <Image alt="logo" height={58} src="/assets/img/logos/logo.png" width={158} />
                        </Brand>
                    </div>
                    <NavHeaderRight>
                        <div>
                            <b>Balance:</b>&nbsp;
                            <span>{numeral(user?.balance || 0).format('$ 0,0')}</span>
                        </div>

                        <div>
                            <b>@{user?.username}</b>
                        </div>
                        <Button type="link" onClick={logout}>
                            Cerrar sesión <LogoutOutlined />
                        </Button>
                    </NavHeaderRight>
                </WrapperHeader>
            </Header>
            <AntdLayout>
                <Sider theme="light" trigger={null} width={250}>
                    <Menu mode="inline" theme="light">
                        <Menu.Item>
                            <Link passHref href="/">
                                <a>Inicio</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link passHref href="/subscriptions">
                                <a>Aperturas y Cancelaciones</a>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <AntdLayout>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <ContentWrapper>{children}</ContentWrapper>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>BTG Pactual &copy;2022 Created by @HurgotDev</Footer>
                </AntdLayout>
            </AntdLayout>
        </AntdLayout>
    )
}

export default Layout
