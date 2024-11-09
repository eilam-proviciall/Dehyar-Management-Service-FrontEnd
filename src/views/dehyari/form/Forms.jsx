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
import EditHumanResourceFormDTO from "@utils/EditHumanResourceFormDTO";

const Forms = ({ invoiceData }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const methods = useForm({
        defaultValues: {}
    });

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const mode = queryParams.get('mode') || 'create';
        const id = queryParams.get('id');

        if (mode === 'edit' && id) {
            setLoading(true);
            api.get(GetHumanResource(id), { requiresAuth: true })
                .then(response => {
                    // methods.reset(dtoToEmployee(response.data));
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
        console.log("Data => ", data)
        const formattedData = salaryToDTO(data);
        const queryParams = new URLSearchParams(window.location.search);
        const mode = queryParams.get('mode') || 'create';
        const id = queryParams.get('id');
        console.log("formattedData => ", formattedData);

        if (!data.profilePicture) {
            toast.error('تصویر پروفایل باید بارگذاری شود');
            return;
        }

        const request = mode === 'create'
            ? api.post(humanResources(), formattedData, { requiresAuth: true })
            : api.put(`${humanResources()}/human-resources/${id}`, formattedData, { requiresAuth: true });

        request.then((res) => handleResponse(res.data)).catch(handleError);
    };

    const handleResponse = (data) => {
        if(data){
            toast.success('با موفقیت ثبت شد');
        } else {
            toast.error('خطا هنگام ثبت اطلاعات');
        }
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
