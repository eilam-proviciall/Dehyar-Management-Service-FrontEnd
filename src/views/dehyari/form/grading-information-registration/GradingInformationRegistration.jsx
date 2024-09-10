'use client'

// React Imports
import React, { useState } from 'react'

// MUI Imports
import { Box, Button, Divider, Grid, Modal, Paper } from '@mui/material';

// ThirdParty Imports
import { toast } from 'react-toastify';

// Component Imports
import StepOrganization from './StepsForm/StepOrganization';
import StepBasicInformation from './StepsForm/StepBasicInformation';
import StepPopulation from './StepsForm/StepPopulation';
import StepIncome from './StepsForm/StepIncome';
import StepPopulationNew from './StepsForm/StepPopulationNew';
import StepIncomeNew from './StepsForm/StepIncomeNew';

const GradingInformationRegistration = () => {

    // States
    const [openModal, setOpenModal] = useState(false);
    const [handleSubmit, setHandleSubmit] = useState(false);
    const [step, setStep] = useState(2);
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
            // 'id': 0,
            'year': '',
            'population': '',
            'family': '',
            'man_count': '',
            'woman_count': '',
        }],
        income_fields: [{
            // 'id': 0,
            year: '',
            per_income: '',
        }]
    });

    const steps = [
        // { step: 0, name: "انتخاب سازمان", content: (<StepOrganization data={data} setData={setData} step={step} setStep={setStep} />) },
        { step: 1, name: "اطلاعات پایه", content: (<StepBasicInformation data={data} setData={setData} step={step} setStep={setStep} />) },
        { step: 2, name: "جمعیت", content: (<StepPopulationNew data={data} setData={setData} step={step} setStep={setStep} />) },
        { step: 3, name: "درآمد", content: (<StepIncomeNew data={data} setData={setData} step={step} setStep={setStep} setOpenModal={setOpenModal} />) }
    ]

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
                            <Grid display={'flex'} item xs={12} gap={2} justifyContent={'center'}>
                                {steps.map((currentStep) => (
                                    <div className={`flex ${currentStep.step == steps[step].step ? 'border-primary text-primary font-bold' : 'sm:flex hidden'} gap-2 items-center justify-between `}>
                                        <div className={`flex rounded-full justify-center items-center h-8 w-8  ${currentStep.step == steps[step].step ? 'border-primary text-primary' : 'border-secondary text-secondary'} font-bold border-4`}>{currentStep.step}</div>
                                        <div>{currentStep.name}</div>
                                        {currentStep.step !== steps.length ? <div className='sm:block hidden text-secondary font-medium'>------------------------------------------------------</div> : ''}
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