// CreateAppDialog.jsx
'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import StepperForm from './StepperForm'

// Vars
const steps = [
    {
        icon: 'ri-file-text-line',
        title: 'Details',
        subtitle: 'Enter Details'
    },
    {
        icon: 'ri-star-smile-line',
        title: 'FrameWorks',
        subtitle: 'Select Framework',
        active: true
    },
    {
        icon: 'ri-pie-chart-2-line',
        title: 'Database',
        subtitle: 'Select Database'
    },
    {
        icon: 'ri-bank-card-line',
        title: 'Billing',
        subtitle: 'Payment Details'
    },
    {
        icon: 'ri-check-double-line',
        title: 'Submit',
        subtitle: 'Submit'
    }
]

const DehyariDialog = ({ open, setOpen }) => {
    // States
    const [activeStep, setActiveStep] = useState(0)

    // Vars
    const isLastStep = activeStep === steps.length - 1

    const handleClose = () => {
        setOpen(false)
        setActiveStep(0)
    }

    const handleStep = step => () => {
        setActiveStep(step)
    }

    const handleNext = () => {
        if (!isLastStep) {
            setActiveStep(prevActiveStep => prevActiveStep + 1)
        } else {
            handleClose()
        }
    }

    const handlePrev = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1)
    }

    return (
        <Dialog fullWidth maxWidth='md' open={open} onClose={handleClose} scroll='body'>
            <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16 '>
                Create App
                <Typography component='span' className='flex flex-col text-center'>
                    Provide data with this form to create your app.
                </Typography>
            </DialogTitle>
            <DialogContent className='pbs-0 sm:pli-16 sm:pbe-16'>
                <IconButton onClick={handleClose} className='absolute block-start-4 inline-end-4'>
                    <i className='ri-close-line text-textSecondary' />
                </IconButton>
                <StepperForm />
            </DialogContent>
        </Dialog>
    )
}

export default DehyariDialog
