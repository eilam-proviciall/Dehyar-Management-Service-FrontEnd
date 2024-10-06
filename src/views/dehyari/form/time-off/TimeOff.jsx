'use client'

// React Imports
import React, { useEffect, useState } from 'react'

// MUI Imports
import { Box, Button, Divider, Drawer, duration, Grid, Modal, Paper } from '@mui/material';

// Component Imports
import { FormProvider, useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { maxLength, minLength, object, string, array, number } from 'valibot';
import TimeOffTable from './list/TimeOffTable';
import TimeOffForm from './list/TimeOffForm';

const schema = object({
    type: number(minLength(1, 'این فیلد الزامی است')),
    start_date: number(minLength(1, 'این فیلد الزامی است')),
    duration: string([minLength(1, 'این فیلد الزامی است'),]),
    attachment_file: string([minLength(1, 'این فیلد الزامی است'),]),
    user_id: string([minLength(1, 'این فیلد الزامی است'),]),
});

const TimeOff = () => {
    const methods = useForm({
        resolver: valibotResolver(schema),
        defaultValues: {
            type: '',
            start_date: Math.floor(Date.now() / 1000),
            duration: '',
            attachment_file: '',
            user_id: ''
        }
    })
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState('add');
    const [data, setData] = useState(methods);



    const handleOpenForm = () => {
        setOpenModal(true);
    }
    const handleCloseForm = () => {
        methods.reset();
        setOpenModal(false);
    };


    return (
        <>
            <Button onClick={handleOpenForm}>افزودن مرخصی</Button>
            {/* <TimeOffTable /> */}
            <Drawer open={openModal} onClose={handleCloseForm} anchor='right' ModalProps={{ keepMounted: true }} sx={{ '& .MuiDrawer-paper': { width: ['100%', 400] } }}
            >
                <div className='bg-backgroundPaper h-full lg:h-auto rounded-2xl'>
                    <Button className='absolute left-0' onClick={handleCloseForm}><i className='ri-close-fill' /></Button>
                    <Grid container p={5} py={10} >
                        {/* <Grid display={'flex'} item xs={12} gap={2} justifyContent={'center'}>
                                {steps.map((currentStep) => (
                                    <div className={`flex ${currentStep.step == steps[step].step ? 'border-primary text-primary font-bold' : 'md:flex hidden'} gap-2 items-center justify-between `}>
                                        <div className={`flex rounded-full justify-center items-center h-8 w-8  ${currentStep.step == steps[step].step ? 'border-primary text-primary' : 'border-secondary text-secondary'} font-bold border-4`}>{currentStep.step}</div>
                                        <div>{currentStep.name}</div>
                                        {currentStep.step !== steps.length ? <div className='md:block hidden text-secondary font-medium'>----------</div> : ''}
                                    </div>
                                ))}
                            </Grid> */}
                        <FormProvider {...methods}>
                            <TimeOffForm data={data} setData={setData} />
                        </FormProvider>
                    </Grid>
                </div>
            </Drawer>
        </>
    )
}
export default TimeOff