import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useFormContext } from '@contexts/ProfileComplete/FormContext';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { passwordSchema } from './validation';
import { TextField, Grid, Button, Typography, InputAdornment, IconButton } from '@mui/material';

const PasswordForm = ({ onBack, onNext }) => {
    const { formData, updateFormData } = useFormContext();
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: valibotResolver(passwordSchema),
        defaultValues: formData.password
    });

    const handleClickShowPassword = () => setIsPasswordShown(show => !show);
    const handleClickShowConfirmPassword = () => setIsConfirmPasswordShown(show => !show);

    const onSubmit = data => {
        updateFormData('password', data);
        onNext();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Typography className='font-medium' color='text.primary'>
                        تغییر رمز عبور
                    </Typography>
                    <Typography variant='body2'>رمز عبور جدید خود را تنظیم کنید</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name='password'
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label='رمز عبور'
                                type={isPasswordShown ? 'text' : 'password'}
                                error={!!errors.password}
                                helperText={errors.password ? errors.password.message : ''}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                size='small'
                                                edge='end'
                                                onClick={handleClickShowPassword}
                                                onMouseDown={e => e.preventDefault()}
                                                aria-label='toggle password visibility'
                                            >
                                                <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name='confirmPassword'
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label='تکرار رمز عبور'
                                type={isConfirmPasswordShown ? 'text' : 'password'}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                size='small'
                                                edge='end'
                                                onClick={handleClickShowConfirmPassword}
                                                onMouseDown={e => e.preventDefault()}
                                                aria-label='toggle password visibility'
                                            >
                                                <i className={isConfirmPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} className='flex justify-between'>
                    <Button variant='outlined' onClick={onBack}>
                        بازگشت
                    </Button>
                    <Button variant='contained' type='submit'>
                        ثبت
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default PasswordForm;
