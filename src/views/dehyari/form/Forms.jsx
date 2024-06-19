'use client'

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Grid, Card, CardContent } from '@mui/material'
import StepJobDetails from './StepJobDetails'
import StepPersonalDetails from './StepPersonalDetails'
import StepEducation from './StepEducation'
import StepInsurance from './StepInsurance'
import StepChildren from './StepChildren'
import StepContract from './StepContract'

const Forms = ({ invoiceData }) => {
    const methods = useForm({
        defaultValues: {
            jobTitle: '',
            nationalCode: '',
            coveredVillages: '',
            fullName: '',
            fatherName: '',
            personalId: '',
            gender: '',
            maritalStatus: '',
            birthPlace: '',
            issuancePlace: '',
            veteranStatus: '',
            militaryService: '',
            educations: [{ degree: '', fieldOfStudy: '', graduationDate: '' }],
            insurances: [{ workplace: '', insurancePeriod: '', insuranceType: '', employmentStartDate: '', employmentEndDate: '' }],
            children: [{ nationalCode: '', fullName: '', gender: '', birthDate: '', marriageDate: '', endOfStudyExemption: '', deathDate: '' }],
            contractType: '',
            employmentStatus: '',
            contractStart: '',
            contractEnd: '',
            descriptionContract: '',
            titleContract: ''
        }
    })

    return (
        <FormProvider {...methods}>
            <Card>
                <CardContent className='sm:!p-12'>
                    <Grid container spacing={6}>
                        <StepJobDetails invoiceData={invoiceData} />
                        <StepPersonalDetails />
                        <StepEducation />
                        <StepInsurance />
                        <StepChildren />
                        <StepContract />
                    </Grid>
                </CardContent>
            </Card>
        </FormProvider>
    )
}

export default Forms
