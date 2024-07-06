import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useFormContext } from '@contexts/ProfileComplete/FormContext';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { passwordSchema } from './validation';
import { TextField, Grid, Button, Typography, InputAdornment, IconButton, List, ListItem, ListItemText, ListItemIcon, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/material/styles';

const CustomGrid = styled(Grid)(({ theme }) => ({
    maxWidth: '1300px',
    maxHeight: '500px',
    margin: '0 auto',
}));

const PasswordForm = ({ onBack, onNext }) => {
    const { formData, updateFormData } = useFormContext();
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
    const [passwordCriteria, setPasswordCriteria] = useState({
        hasUpperLowerCase: false,
        hasNumber: false,
        passwordsMatch: false,
        hasMinLength: false,
        hasSpecialChar: false
    });

    const { control, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: valibotResolver(passwordSchema),
        defaultValues: formData.password
    });

    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    useEffect(() => {
        const hasUpperLowerCase = /(?=.*[a-z])(?=.*[A-Z])/.test(password);
        const hasNumber = /(?=.*\d)/.test(password);
        const passwordsMatch = password === confirmPassword && password.length > 0;
        const hasMinLength = password.length >= 8;
        const hasSpecialChar = /(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?])/.test(password);

        setPasswordCriteria({ hasUpperLowerCase, hasNumber, passwordsMatch, hasMinLength, hasSpecialChar });
    }, [password, confirmPassword]);

    const handleClickShowPassword = () => setIsPasswordShown(show => !show);
    const handleClickShowConfirmPassword = () => setIsConfirmPasswordShown(show => !show);

    const onSubmit = data => {
        updateFormData('password', data);
        console.log(formData)
        // onNext();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CustomGrid container spacing={5}>
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
                <Grid item xs={12}>
                    <List>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <ListItem>
                                    <ListItemIcon>
                                        {passwordCriteria.hasUpperLowerCase ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                        ) : (
                                            <CancelIcon style={{ color: 'red' }} />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="رمز عبور باید حداقل شامل یک حرف بزرگ و یک حرف کوچک باشد"
                                        primaryTypographyProps={{ style: { color: passwordCriteria.hasUpperLowerCase ? 'green' : 'red' } }}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        {passwordCriteria.hasNumber ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                        ) : (
                                            <CancelIcon style={{ color: 'red' }} />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="رمز عبور باید حداقل شامل یک عدد باشد"
                                        primaryTypographyProps={{ style: { color: passwordCriteria.hasNumber ? 'green' : 'red' } }}
                                    />
                                </ListItem>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <ListItem>
                                    <ListItemIcon>
                                        {passwordCriteria.hasMinLength ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                        ) : (
                                            <CancelIcon style={{ color: 'red' }} />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="رمز عبور باید حداقل ۸ کاراکتر باشد"
                                        primaryTypographyProps={{ style: { color: passwordCriteria.hasMinLength ? 'green' : 'red' } }}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        {passwordCriteria.hasSpecialChar ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                        ) : (
                                            <CancelIcon style={{ color: 'red' }} />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="رمز عبور باید حداقل شامل یک علامت نگارشی باشد"
                                        primaryTypographyProps={{ style: { color: passwordCriteria.hasSpecialChar ? 'green' : 'red' } }}
                                    />
                                </ListItem>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItem>
                                    <ListItemIcon>
                                        {passwordCriteria.passwordsMatch ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                        ) : (
                                            <CancelIcon style={{ color: 'red' }} />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="رمز عبور و تکرار آن باید یکسان باشند"
                                        primaryTypographyProps={{ style: { color: passwordCriteria.passwordsMatch ? 'green' : 'red' } }}
                                    />
                                </ListItem>
                            </Grid>
                        </Grid>
                    </List>
                </Grid>
                <Grid item xs={12} className='flex justify-between'>
                    <Button variant='outlined' onClick={onBack}>
                        بازگشت
                    </Button>
                    <Button variant='contained' type='submit'>
                        ثبت
                    </Button>
                </Grid>
            </CustomGrid>
        </form>
    );
};

export default PasswordForm;
