import 'antd/dist/antd.css'
import '../assets/css/styles.css'
import { FC } from 'react'
import { ThemeProvider as StyledComponentThemeProvider } from 'styled-components'
import { defaultTheme as StyledComponentTheme } from 'core/themes/StyledComponents.theme'
import { AppPropsWithLayout } from 'types/next'
import AuthProvider from 'src/context/login'

function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page: FC) => page)

    return (
        <AuthProvider>
            <StyledComponentThemeProvider theme={StyledComponentTheme}>
                {getLayout(<Component {...pageProps} />)}
            </StyledComponentThemeProvider>
        </AuthProvider>
    )
}

export default App
