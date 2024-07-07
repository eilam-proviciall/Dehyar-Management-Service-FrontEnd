"use client"
import React from 'react';
import ProfileComplete from "@views/profile/complet/ProfileComplete";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {FormProvider} from "@contexts/ProfileComplete/FormContext";
import {AuthProvider} from "@contexts/AuthContext";

function Page(props) {
    return (
        <AuthProvider>
            <FormProvider>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        padding: '20px',
                    }}
                >
                    <Typography variant="h4" sx={{marginBottom: '20px', color: '#fff'}}>
                        فرم تکمیل اطلاعات کاربر
                    </Typography>
                    <ProfileComplete/>
                </Box>
            </FormProvider>
        </AuthProvider>
    );
}

export default Page;
