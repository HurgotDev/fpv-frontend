import styled from 'styled-components'
import { Layout as AntdLayout, Card } from 'antd'

export const WrapperHeader = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`

export const Brand = styled.div`
    height: 100%;
    display: flex;
`

export const Header = styled(AntdLayout.Header)`
    background: #fff;
`

export const ContentWrapper = styled(Card)`
    border-radius: 10px;
    height: 100%;
`

export const NavHeaderRight = styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 12px;
`
