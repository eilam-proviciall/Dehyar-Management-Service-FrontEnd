'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { Card, CardContent, Grid, Button } from '@mui/material'
import StepJobDetails from './StepJobDetails'
import StepPersonalDetails from './StepPersonalDetails'
import StepEducation from './StepEducation'
import StepInsurance from './StepInsurance'
import StepChildren from './StepChildren'
import StepContract from './StepContract'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import SaveIcon from '@mui/icons-material/Save'

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

    const onSubmit = data => {
        console.log('Form Data:', data)
    }

    return (
        <>
            <Grid container spacing={6}>
                <FormProvider {...methods}>
                    <Grid item xs={12} md={9}>
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
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Grid container spacing={6}>
                            <Grid item xs={12}>
                                <Card>
                                    <CardContent className='flex flex-col gap-4'>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            startIcon={<SaveIcon />}
                                            onClick={methods.handleSubmit(onSubmit)}
                                            style={{
                                                backgroundColor: '#1976d2', // رنگ آبی جذاب
                                                color: 'white',
                                                fontWeight: 'bold',
                                                textTransform: 'none',
                                                borderRadius: '8px',
                                                padding: '10px 20px',
                                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                                                marginTop: '20px',
                                            }}
                                        >
                                            ذخیره
                                        </Button>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="error"
                                            startIcon={<PictureAsPdfIcon />}
                                        >
                                            حکم کارگزینی
                                        </Button>
                                        <Button
                                            fullWidth
                                            color='secondary'
                                            variant='outlined'
                                            className='capitalize'
                                        >
                                            اطلاعات پرسنلی
                                        </Button>
                                        <Button fullWidth color='secondary' variant='outlined' className='capitalize'>
                                            پروفایل
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </FormProvider>
            </Grid>
        </>
    )
}

export default Forms
