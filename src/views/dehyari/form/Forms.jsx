"use client"
// Forms.js
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { Grid, CircularProgress, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ButtonGroup from './ButtonGroup';
import FormContent from './FormContent';
import { GetHumanResource, humanResources } from '@/Services/humanResources';
import { dtoToEmployee, salaryToDTO } from '@/utils/SalaryDTO';
import ProfilePictureUpload from "@views/dehyari/form/StepsForm/ProfilePictureUpload";
import api from '@/utils/axiosInstance';

const Forms = ({ invoiceData }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const methods = useForm({
        defaultValues: {
            jobTitle: '',
            coveredVillages: {},
            fullName: '',
            villageEmployer: '',
            fatherName: '',
            nationalCode: '',
            birthDate: '',
            phoneNumbers: {},
            personalId: '',
            gender: '',
            maritalStatus: '',
            birthPlace: '',
            issuancePlace: '',
            veteranStatus: '',
            militaryService: '',
            educations: [{ degree: '', fieldOfStudy: '', graduationDate: '' }],
            insurances: [{ workplace: '', insurancePeriod: '', insuranceType: '', employmentStartDate: '', employmentEndDate: '' }],
            children: [{ nationalCode: '', fullName: '', gender: '', birthDate: '', marriageDate: '', endOfStudyExemption: '', death_date: '' }],
            contractType: '',
            employmentStatus: '',
            contractStart: '',
            contractEnd: '',
            execute_start: '',
            descriptionContract: '',
            titleContract: '',
            profilePicture: ''
        }
    });

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const mode = queryParams.get('mode') || 'create';
        const id = queryParams.get('id');

        if (mode === 'edit' && id) {
            setLoading(true);
            api.get(GetHumanResource(id), { requiresAuth: true })
                .then(response => {
                    methods.reset(dtoToEmployee(response.data));
                    console.log(dtoToEmployee(response.data))
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setLoading(false);
                });
        }
    }, [methods]);

    const onSubmit = data => {
        const formattedData = salaryToDTO(data);
        const queryParams = new URLSearchParams(window.location.search);
        const mode = queryParams.get('mode') || 'create';
        const id = queryParams.get('id');
        const request = mode === 'create'
            ? api.post(humanResources(), formattedData, { requiresAuth: true })
            : api.put(`${humanResources()}/human-resources/${id}`, formattedData, { requiresAuth: true });

        request.then((res) => handleResponse(res.data)).catch(handleError);
    };

    const handleResponse = (data) => {
        const { human_resource, children, educations, insurances } = data;
        if (human_resource) {
            toast.success("Human resource با موفقیت به‌روزرسانی شد");
            window.location.href = '/dehyari';
        } else {
            toast.error("خطا در به‌روزرسانی Human resource");
        }

        children.forEach((status, index) => {
            if (status) {
                toast.success(`Child ${index + 1} با موفقیت به‌روزرسانی شد`);
            } else {
                toast.error(`خطا در به‌روزرسانی Child ${index + 1}`);
            }
        });

        educations.forEach((status, index) => {
            if (status) {
                toast.success(`Education ${index + 1} با موفقیت به‌روزرسانی شد`);
            } else {
                toast.error(`خطا در به‌روزرسانی Education ${index + 1}`);
            }
        });

        insurances.forEach((status, index) => {
            if (status) {
                toast.success(`Insurance ${index + 1} با موفقیت به‌روزرسانی شد`);
            } else {
                toast.error(`خطا در به‌روزرسانی Insurance ${index + 1}`);
            }
        });
    };

    const handleError = (error) => error;

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error.message}</Alert>;

    return (
        <Grid container spacing={6}>
            <FormProvider {...methods}>
                <Grid item xs={12} md={9}>
                    <FormContent invoiceData={invoiceData} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <ProfilePictureUpload />
                        </Grid>
                        <Grid item xs={12}>
                            <ButtonGroup onSubmit={methods.handleSubmit(onSubmit)} />
                        </Grid>
                    </Grid>
                </Grid>
            </FormProvider>
        </Grid>
    );
}

export default Forms;
