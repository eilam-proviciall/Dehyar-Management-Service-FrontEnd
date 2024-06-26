// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Component Imports
// Config Imports
// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'
import {Toaster} from "react-hot-toast";

export const metadata = {
    title: 'Materialize - Material Next.js Admin Template',
    description: 'Materialize - Material Next.js Admin Template'
}

const RootLayout = ({children, params}) => {

    // Vars
    const direction = "rtl"
    return (
        <html id='__next' lang={params.lang} dir={direction}>
        <body className='flex is-full min-bs-full flex-auto flex-col'>{children}</body>

        </html>

    )
}

export default RootLayout
