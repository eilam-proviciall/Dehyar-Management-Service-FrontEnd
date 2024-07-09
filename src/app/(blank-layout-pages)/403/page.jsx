'use client'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

const Page = ({ mode }) => {
    // Vars
    const darkImg = '/images/pages/misc-mask-1-dark.png'
    const lightImg = '/images/pages/misc-mask-1-light.png'

    // Hooks
    const miscBackground = useImageVariant(mode, lightImg, darkImg)

    return (
        <div className='flex items-center justify-center min-bs-[100dvh] relative p-6 overflow-x-hidden'>
            <div className='flex items-center flex-col text-center gap-10'>
                <div className='flex flex-col gap-2 is-[90vw] sm:is-[unset]'>
                    <Typography className='font-medium text-8xl' color='text.primary'>
                        403
                    </Typography>
                    <Typography variant='h4'>شما  به این صفحه دسترسی ندارید⚠️</Typography>
                    <Typography variant='h4'>سوابق دسترسی های غیر مجاز در سامانه ثبت میگردد⚠️</Typography>
                    <Typography variant='h4'>همچنین تکرار برای اقدام به صفحات غیر مجاز موجب مسدودی حساب کاربری میگردد⚠️</Typography>
                </div>
                <Button href='/login'  variant='contained'>
                   بازگشت به صفحه ورود
                </Button>
            </div>
            <img src={miscBackground} className='absolute bottom-0 z-[-1] is-full max-md:hidden' />
        </div>
    )
}

export default Page
