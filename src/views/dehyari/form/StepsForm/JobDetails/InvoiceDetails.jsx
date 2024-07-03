import React from 'react';
import { Grid, InputAdornment, TextField, Typography } from '@mui/material';
import Logo from "@core/svg/Logo";

const InvoiceDetails = ({ invoiceData }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <div className='p-6 bg-actionHover rounded-xl'>
                    <div className='flex justify-between items-center'>
                        <Grid item xs={4}>
                            <div style={{ width: 200 }} className='flex justify-start'>
                                <Logo />
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className='flex flex-col items-center'>
                                <Typography variant='h6'>قرارداد مدت معین و حکم حقوقی</Typography>
                                <Typography variant='h6'>دهیار تمام وقت</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className='flex flex-col gap-2'>
                                <div className='flex items-center'>
                                    <Typography>شماره قرارداد:</Typography>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        value={invoiceData[0].id}
                                        InputProps={{
                                            disabled: true,
                                            startAdornment: <InputAdornment position='start'>#</InputAdornment>
                                        }}
                                    />
                                </div>
                                <div className='flex items-center gap-4'>
                                    <Typography color='text.primary'>تاریخ اجرا</Typography>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        value={invoiceData[0].id}
                                        InputProps={{
                                            disabled: true,
                                            startAdornment: <InputAdornment position='start'>1403/04/04</InputAdornment>
                                        }}
                                    />
                                </div>
                            </div>
                        </Grid>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
};

export default InvoiceDetails;
