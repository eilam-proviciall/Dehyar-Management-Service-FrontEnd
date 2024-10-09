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
import { maxLength, minLength, object, string, array, number } from 'valibot';
import StepCountryDivision from './StepsForm/StepCountryDivision';

const schemas = [
    object({
        organization: number(minLength(1, 'این فیلد الزامی است')),
        // municipality: array(
        //     object({
        //         states: object({ value: number(minLength(1, 'این فیلد الزامی است')), name: string([minLength(1, 'این فیلد الزامی است')]) }),
        //         cities: object({ value: number(minLength(1, 'این فیلد الزامی است')), name: string([minLength(1, 'این فیلد الزامی است')]) }),
        //         regions: object({ value: number(minLength(1, 'این فیلد الزامی است')), name: string([minLength(1, 'این فیلد الزامی است')]) }),
        //         departments: object({ value: number(minLength(1, 'این فیلد الزامی است')), name: string([minLength(1, 'این فیلد الزامی است')]) }),
        //     })
        // ),
    }),
    object({
        hierarchy_code: string([minLength(1, 'این فیلد الزامی است')]),
        village_code: string([minLength(1, 'این فیلد الزامی است')]),
        national_id: string([minLength(1, 'این فیلد الزامی است')]),
        area_hectares: string([minLength(1, 'این فیلد الزامی است')]),
        centralization: number(minLength(1, 'این فیلد الزامی است')),
        tourism_goal: number(minLength(1, 'این فیلد الزامی است')),
        postal_code: string([minLength(1, 'این فیلد الزامی است')]),
        fire_station: number(minLength(1, 'این فیلد الزامی است')),
        foundation_date: number(minLength(1, 'این فیلد الزامی است')),
        grade_date: number(minLength(1, 'این فیلد الزامی است')),
        grade: string([minLength(1, 'این فیلد الزامی است')]),
        state_grade: string([minLength(1, 'این فیلد الزامی است')]),
        city_grade: string([minLength(1, 'این فیلد الزامی است')]),
        // dehyari: array(
        //     object({
        //         states: object({ value: number(minLength(1, 'این فیلد الزامی است')), name: string([minLength(1, 'این فیلد الزامی است')]) }),
        //         cities: object({ value: number(minLength(1, 'این فیلد الزامی است')), name: string([minLength(1, 'این فیلد الزامی است')]) }),
        //         regions: object({ value: number(minLength(1, 'این فیلد الزامی است')), name: string([minLength(1, 'این فیلد الزامی است')]) }),
        //         dehestans: object({ value: number(minLength(1, 'این فیلد الزامی است')), name: string([minLength(1, 'این فیلد الزامی است')]) }),
        //         villages: object({ value: number(minLength(1, 'این فیلد الزامی است')), name: string([minLength(1, 'این فیلد الزامی است')]) }),
        //     })
        // ),
    }),
    object({
        populations:
            array(
                object({
                    year: string(
                        [
                            minLength(1, 'این فیلد الزامی است'),
                            minLength(4, 'سال باید 4 رقمی باشد'),
                            maxLength(4, 'سال نمیتواند بیشتر از 4 رقم باشد')
                        ]
                    ),
                    households: string([minLength(1, 'این فیلد الزامی است')]),
                    population: string([minLength(1, 'این فیلد الزامی است')]),
                    male: string([minLength(1, 'این فیلد الزامی است')]),
                    female: string([minLength(1, 'این فیلد الزامی است')]),
                })
            ),
    }),
    object({
        incomes:
            array(
                object({
                    year: string(
                        [
                            minLength(1, 'این فیلد الزامی است'),
                            minLength(4, 'سال باید 4 رقمی باشد'),
                            maxLength(4, 'سال نمیتواند بیشتر از 4 رقم باشد')
                        ]
                    ),
                    total_income: string([minLength(1, 'این فیلد الزامی است')]),
                    income_per_capital: string([minLength(1, 'این فیلد الزامی است')]),
                })
            ),
    }),
]

const GradingInformationRegistration = () => {
    const [step, setStep] = useState(0);
    const methods = useForm({
        resolver: valibotResolver(schemas[step]),
        defaultValues: {
            organization: '',
            hierarchy_code: '',
            village_code: '',
            national_id: '',
            area_hectares: '',
            centralization: '',
            tourism_goal: '',
            postal_code: '',
            fire_station: '',
            foundation_date: '',
            grade_date: '',
            grade: '',
            state_grade: '',
            city_grade: '',
            // municipality: [{
            //     states: { value: 0, name: '' },
            //     cities: { value: 0, name: '' },
            //     regions: { value: 0, name: '' },
            //     departments: { value: 0, name: '' },
            // }],
            // dehyari: [{
            //     states: { value: 0, name: '' },
            //     cities: { value: 0, name: '' },
            //     regions: { value: 0, name: '' },
            //     dehestans: { value: 0, name: '' },
            //     villages: { value: 0, name: '' },
            // }],
            populations: [{ year: '', households: '', population: '', male: '', female: '' }],
            incomes: [{ year: '', income_per_capital: '', total_income: '' }]
        }
    })

    // States
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [mode, setMode] = useState('add');
    const [data, setData] = useState(methods);

    console.log("Data => ", data);

    const handleOpenForm = () => setOpenModal(true);
    const handleCloseForm = () => {
        methods.reset();
        setData({
            organization: '',
            hierarchy_code: '',
            village_code: '',
            national_id: '',
            dehyari_status: '',
            area_hectares: '',
            centralization: '',
            tourism_goal: '',
            postal_code: '',
            fire_station: '',
            foundation_date: '',
            grade_date: '',
            grade: '',
            municipality: [{
                states: { value: 0, name: '' },
                cities: { value: 0, name: '' },
                regions: { value: 0, name: '' },
                departments: { value: 0, name: '' },
            }],
            dehyari: [{
                states: { value: 0, name: '' },
                cities: { value: 0, name: '' },
                regions: { value: 0, name: '' },
                dehestans: { value: 0, name: '' },
                villages: { value: 0, name: '' },
            }],
            populations: [{ year: '', households: '', population: '', male: '', female: '' }],
            incomes: [{ year: '', income_per_capital: '', total_income: '' }]
        });
        setStep(0);
        setOpenModal(false);
    };

    const steps = [
        { step: 1, name: "تقسیمات کشوری", content: (<StepCountryDivision data={data} setData={setData} step={step} setStep={setStep} mode={mode} />) },
        { step: 2, name: "اطلاعات تکمیلی", content: (<StepBasicInformation data={data} setData={setData} step={step} setStep={setStep} mode={mode} />) },
        { step: 3, name: "جمعیت", content: (<StepPopulationNew data={data} setData={setData} step={step} setStep={setStep} />) },
        { step: 4, name: "درآمد", content: (<StepIncomeNew data={data} setData={setData} step={step} setStep={setStep} onClose={handleCloseForm} mode={mode} methods={methods} />) }
    ];


    return (
        <>
            <GradingTable handleToggle={handleOpenForm} setMode={setMode} setData={setData} methods={methods} />
            <Modal open={openModal} onClose={handleCloseForm} style={{ margin: '2%' }}>
                <Paper style={{ maxHeight: '100%', overflowY: 'auto' }}>
                    <div className='bg-backgroundPaper h-full lg:h-auto rounded-2xl'>
                        <Button className='absolute left-0' onClick={handleCloseForm}><i className='ri-close-fill' /></Button>
                        <Grid container p={5} py={10} >
                            <Grid display={'flex'} item xs={12} gap={2} justifyContent={'center'}>
                                {steps.map((currentStep) => (
                                    <div className={`flex ${currentStep.step == steps[step].step ? 'border-primary text-primary font-bold' : 'sm:flex hidden'} gap-2 items-center justify-between `}>
                                        <div className={`flex rounded-full justify-center items-center h-8 w-8  ${currentStep.step == steps[step].step ? 'border-primary text-primary' : 'border-secondary text-secondary'} font-bold border-4`}>{currentStep.step}</div>
                                        <div>{currentStep.name}</div>
                                        {currentStep.step !== steps.length ? <div className='sm:block hidden text-secondary font-medium'>----------------</div> : ''}
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