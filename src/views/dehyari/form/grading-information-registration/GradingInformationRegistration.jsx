'use client'

// React Imports
import React, { useEffect, useState } from 'react'

// MUI Imports
import { Box, Button, Divider, Grid, Modal, Paper } from '@mui/material';

// Component Imports
import StepBasicInformation from './StepsForm/StepBasicInformation';
import StepPopulationNew from './StepsForm/StepPopulationNew';
import StepIncomeNew from './StepsForm/StepIncomeNew';
import GradingTable from './list/GradingTable';
import { FormProvider, useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { maxLength, minLength, object, string, array } from 'valibot';

const schemas = [
    object({
        organization_type: string([minLength(1, 'این فیلد الزامی است')]),
        hierarchical_code: string([minLength(1, 'این فیلد الزامی است')]),
        village_code: string([minLength(1, 'این فیلد الزامی است')]),
        nid: string([
            minLength(1, 'این فیلد الزامی است'),
            minLength(10, 'کد ملی باید 10 رقمی باشد'),
            maxLength(10, 'کد ملی  نمیتواند بیشتر از 10 رقم باشد')
        ],
        ),
        dehyari_status: string([minLength(1, 'این فیلد الزامی است')]),
        wide: string([minLength(1, 'این فیلد الزامی است')]),
        centrality_status: string([minLength(1, 'این فیلد الزامی است')]),
        tourism_status: string([minLength(1, 'این فیلد الزامی است')]),
        postal_code: string([minLength(1, 'این فیلد الزامی است')]),
        fire_station: string([minLength(1, 'این فیلد الزامی است')]),
        date_established: string([minLength(1, 'این فیلد الزامی است')]),
        date_grading: string([minLength(1, 'این فیلد الزامی است')]),
        grade: string([minLength(1, 'این فیلد الزامی است')]),
    }),
    object({
        population_fields:
            array(
                object({
                    year: string(
                        [
                            minLength(1, 'این فیلد الزامی است'),
                            minLength(4, 'سال باید 4 رقمی باشد'),
                            maxLength(4, 'سال نمیتواند بیشتر از 4 رقم باشد')
                        ]
                    ),
                    population: string([minLength(1, 'این فیلد الزامی است')]),
                    family: string([minLength(1, 'این فیلد الزامی است')]),
                    man_count: string([minLength(1, 'این فیلد الزامی است')]),
                    woman_count: string([minLength(1, 'این فیلد الزامی است')]),
                })
            ),
    }),
    object({
        income_fields:
            array(
                object({
                    year: string(
                        [
                            minLength(1, 'این فیلد الزامی است'),
                            minLength(4, 'سال باید 4 رقمی باشد'),
                            maxLength(4, 'سال نمیتواند بیشتر از 4 رقم باشد')
                        ]
                    ),
                    per_income: string([minLength(1, 'این فیلد الزامی است')]),
                })
            ),
    }),
]

const GradingInformationRegistration = () => {

    // States
    const [users, setUsers] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [mode, setMode] = useState('add');
    const [step, setStep] = useState(0);
    const [data, setData] = useState({
        id: Date.now(),
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
        population_fields: [{ year: '', population: '', family: '', man_count: '', woman_count: '' }],
        income_fields: [{ year: '', per_income: '' }]
    });

    const methods = useForm({
        resolver: valibotResolver(schemas[step]),
        id: Date.now(),
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
        population_fields: [{ year: '', population: '', family: '', man_count: '', woman_count: '' }],
        income_fields: [{ year: '', per_income: '' }]
    })

    console.log("Data => ", data);
    console.log();

    useEffect(() => { }, [])


    const handleOpenForm = () => setOpenModal(true);
    const handleCloseForm = () => {
        methods.reset();
        setData({
            id: Date.now(),
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
            population_fields: [{ year: '', population: '', family: '', man_count: '', woman_count: '' }],
            income_fields: [{ year: '', per_income: '' }]
        });
        setStep(0);
        setOpenModal(false);
    };

    const steps = [
        { step: 0, name: "اطلاعات پایه", content: (<StepBasicInformation data={data} setData={setData} step={step} setStep={setStep} />) },
        { step: 1, name: "جمعیت", content: (<StepPopulationNew data={data} setData={setData} step={step} setStep={setStep} />) },
        { step: 2, name: "درآمد", content: (<StepIncomeNew data={data} setData={setData} step={step} setStep={setStep} onClose={handleCloseForm} users={users} setUsers={setUsers} mode={mode} methods={methods} />) }
    ];


    return (
        <>
            <GradingTable users={users} setUsers={setUsers} handleOpenModal={handleOpenForm} setData={setData} setMode={setMode} methods={methods} />
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
                                <FormProvider {...methods}>
                                    {steps[step].content}
                                </FormProvider>
                            </div>
                        </Grid>
                    </div>
                </Paper>
            </Modal >
        </>
    )
}
export default GradingInformationRegistration