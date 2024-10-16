// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Component Imports
// Config Imports
// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'
import {Toaster} from "react-hot-toast";
import NumberConversionScript from "@/app/NumberConversionScript";

export const metadata = {
    title: 'سازمان شهرداری ها و دهیاری',
    description: 'سامانه خدمات الکترونیکی'
}

const RootLayout = ({ children, params }) => {
    const direction = "rtl";

    return (
        <html id='__next' lang={params.lang} dir={direction}>
        <body className='flex is-full min-bs-full flex-auto flex-col'>
        {children}
        </body>
        </html>
    );
};

export default RootLayout;


