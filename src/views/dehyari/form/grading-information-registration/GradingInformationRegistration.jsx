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
import StepPopulation from './StepsForm/StepPopulation';
import StepIncome from './StepsForm/StepIncome';

const GradingInformationRegistration = () => {

    // States
    const [openModal, setOpenModal] = useState(false);
    const [handleSubmit, setHandleSubmit] = useState(false);
    const [step, setStep] = useState(0);
    const [data, setData] = useState({
        organization_type: '',
        hierarchical_code: '',
        village_code: '',
        nid: '',
        dehyari_status: '',
        wide: '',
        centrality_status: '',
        tourism_status: '',
        postal_code: '',
        fire_station: '',
        date_established: '',
        date_grading: '',
        grade: '',
        population_fields: [{
            'id': 0,
            'population_fields.0.year': '',
            'population_fields.0.population': '',
            'population_fields.0.family': '',
            'population_fields.0.man_count': '',
            'population_fields.0.woman_count': '',
        }],
        income_fields: [{
            'id': 0,
            'income_fields.0.year': '',
            'income_fields.0.per_income': '',
        }]
    });

    const steps = [
        { step: 0, name: "انتخاب سازمان", content: (<StepOrganization data={data} setData={setData} step={step} setStep={setStep} />) },
        { step: 1, name: "اطلاعات پایه", content: (<StepBasicInformation data={data} setData={setData} step={step} setStep={setStep} />) },
        { step: 2, name: "جمعیت", content: (<StepPopulation data={data} setData={setData} step={step} setStep={setStep} />) },
        { step: 3, name: "درآمد", content: (<StepIncome data={data} setData={setData} step={step} setStep={setStep} setOpenModal={setOpenModal} />) }
    ]

    // Handlers
    const handleNextStep = () => {
        switch (step) {
            case 0: {
                break;
            }
            case 1: {
                setHandleSubmit(true);
                console.log(handleSubmit);
                break;
            }
            case 2: {
                setStep(3);
                break;
            }
        }
    }
    const handleOpenForm = () => setOpenModal(true);
    const handleCloseForm = () => {
        setStep(0);
        setOpenModal(false);
    };

    return (
        <>
            <Button variant='contained' onClick={handleOpenForm}>باز کردن فرم درجه بندی</Button>
            <Modal open={openModal} onClose={handleCloseForm} style={{ margin: '2%' }}>
                <Paper style={{ maxHeight: '100%', overflowY: 'auto' }}>
                    <div className='bg-backgroundPaper h-full lg:h-auto rounded-2xl'>
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
                            </div>
                        </Grid>
                    </div>
                </Paper>
            </Modal >
        </>
    )
}

export default GradingInformationRegistration