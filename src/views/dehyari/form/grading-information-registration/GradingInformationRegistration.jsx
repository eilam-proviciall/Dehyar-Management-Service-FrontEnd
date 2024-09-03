'use client'

// React Imports
import React, { useState } from 'react'

// MUI Imports
import { Box, Button, Grid, Modal, Paper } from '@mui/material';

// ThirdParty Imports
import { toast } from 'react-toastify';

// Component Imports
import StepOrganization from './StepsForm/StepOrganization';
import StepBasicInformation from './StepsForm/StepBasicInformation';

const GradingInformationRegistration = () => {

    // States
    const [openModal, setOpenModal] = useState(false);
    const [step, setStep] = useState(0);
    const [data, setData] = useState({
        organization_type: '',
        hierarchical_code: '',
        village_code: '',
        nid: '',
        wide: '',
        centrality_status: '',
        tourism_status: '',
        postal_code: '',
    });

    const steps = [
        { step: 0, name: "انتخاب سازمان", content: (<StepOrganization data={data} setData={setData} />) },
        { step: 1, name: "اطلاعات پایه", content: (<StepBasicInformation data={data} setData={setData} />) },
        { step: 2, name: "جمعیت", content: (<StepOrganization />) },
        { step: 3, name: "درآمد", content: (<StepOrganization />) }
    ]

    // Handlers
    const handleNextStep = () => {
        switch (step) {
            case 0: {
                data.organization_type === '' ? toast.error("شما باید یک سازمان را برای رفتن به مرحله بعد انتخاب نمایید", {
                    position: "top-center",
                    duration: 3000,
                }) : setStep(1);
                break;
            }
            case 1: {
                setStep(2);
                break;
            }
            case 2: {
                setStep(3);
                break;
            }
        }
    }
    const handleOpenForm = () => setOpenModal(true);
    const handleCloseForm = () => setOpenModal(false);

    return (
        <>
            <Button variant='contained' onClick={handleOpenForm}>باز کردن فرم درجه بندی</Button>
            <Modal open={openModal} onClose={handleCloseForm} >
                <div className='bg-backgroundPaper h-full lg:m-24 lg:h-auto rounded-2xl'>
                    <Paper style={{ maxHeight: '100%', overflowY: 'auto' }}>
                        <Button onClick={handleCloseForm}><i className='ri-close-fill' /></Button>
                        <Grid container >
                            <Grid display={'flex'} item xs={12} gap={5} justifyContent={'center'}>
                                {steps.map((currentStep) => (
                                    <div className={`${currentStep.step == steps[step].step ? 'border-primary text-primary' : 'sm:block hidden'} p-4 border-b-2 `}>
                                        {currentStep.name}
                                    </div>
                                ))}
                            </Grid>
                            <div className='border-2 p-5 w-full m-5 rounded-2xl'>
                                {steps[step].content}
                                <Box display={'flex'} mt={2} gap={5} justifyContent={'center'} >
                                    {step > 0 && (
                                        <Button variant='contained' color='secondary' onClick={() => { setStep(step - 1) }}>برگشت</Button>
                                    )}
                                    {step < steps.length - 1 ? (
                                        <Button variant='contained' color='primary' onClick={() => { handleNextStep() }}>بعدی</Button>
                                    ) :
                                        <Button variant='contained' color='success' onClick={() => { }}>ثبت</Button>
                                    }
                                </Box>
                            </div>
                        </Grid>
                    </Paper>
                </div>
            </Modal >
        </>
    )
}

export default GradingInformationRegistration