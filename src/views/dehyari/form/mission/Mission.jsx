'use client'

// React Imports
import React, { useEffect, useState } from 'react'

// MUI Imports
import { Box, Button, Divider, Drawer, duration, Grid, Modal, Paper } from '@mui/material';

// Component Imports
import { FormProvider, useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { maxLength, minLength, object, string, array, number } from 'valibot';
import MissionTable from './list/MissionTable';
import MissionForm from './list/MissionForm';

const schema = object({
    request_type: number(minLength(1, 'این فیلد الزامی است')),
    mission_type: number(minLength(1, 'این فیلد الزامی است')),
    subject: string([minLength(1, 'این فیلد الزامی است'),]),
    accommodation: number(minLength(1, 'این فیلد الزامی است')),
    transportation: number(minLength(1, 'این فیلد الزامی است')),
    mission_duration: number(minLength(1, 'این فیلد الزامی است')),
    start_date: number(minLength(1, 'این فیلد الزامی است')),
    description: string([minLength(1, 'این فیلد الزامی است'),]),
    destination: number(minLength(1, 'این فیلد الزامی است')),
});

const Mission = () => {
    const methods = useForm({
        resolver: valibotResolver(schema),
        defaultValues: {
            request_type: '',
            mission_type: '',
            subject: '',
            accommodation: '',
            transportation: '',
            mission_duration: '',
            start_date: Math.floor(Date.now() / 1000),
            description: '',
            destination: ''
        }
    })
    const [openModal, setOpenModal] = useState(false);
    const [mode, setMode] = useState('add');
    const [data, setData] = useState(methods);

    const handleToggle = () => {
        setOpenModal(!openModal);
    }

    const handleOpenForm = () => {
        setOpenModal(true);
    }
    const handleCloseForm = () => {
        methods.reset();
        setMode('add');
        setOpenModal(false);
    };


    return (
        <>
            <MissionTable handleToggle={handleToggle} setMode={setMode} />
            <Drawer open={openModal} onClose={handleCloseForm} anchor='right' ModalProps={{ keepMounted: true }} sx={{ '& .MuiDrawer-paper': { width: ['100%', 400] } }}
            >
                <div className='bg-backgroundPaper h-full lg:h-auto rounded-2xl'>
                    <Button className='absolute left-0' onClick={handleCloseForm}><i className='ri-close-fill' /></Button>
                    <Grid container p={5} py={10} >
                        <FormProvider {...methods}>
                            <MissionForm data={data} setData={setData} />
                        </FormProvider>
                    </Grid>
                </div>
            </Drawer>
        </>
    )
}
export default Mission