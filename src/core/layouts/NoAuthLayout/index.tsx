import React, { FC } from 'react'
// eslint-disable-next-line import/order
import { Layout as AntdLayout } from 'antd'
const { Content } = AntdLayout

import Image from 'next/image'

import { Header, WrapperHeader, Brand } from './styled'

const Layout: FC = ({ children }) => {
    return (
        <AntdLayout style={{ height: '100vh' }}>
            <Header>
                <WrapperHeader>
                    <div>
                        <Brand>
                            <Image alt="logo" height={58} src="/assets/img/logos/logo.png" width={158} />
                        </Brand>
                    </div>
                </WrapperHeader>
            </Header>
            <AntdLayout>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {children}
                </Content>
            </AntdLayout>
        </AntdLayout>
    )
}

export default Layout
