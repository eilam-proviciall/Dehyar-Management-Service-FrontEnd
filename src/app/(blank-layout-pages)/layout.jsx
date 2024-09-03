// Component Imports
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'

// Config Imports
// Util Imports
import {getSystemMode} from '@core/utils/serverHelpers'

const Layout = ({children, params}) => {
    // Vars
    const systemMode = getSystemMode()

    return (
        <Providers direction={"rtl"}>
                <BlankLayout systemMode={systemMode}>{children}</BlankLayout>
        </Providers>
    )
}

export default Layout