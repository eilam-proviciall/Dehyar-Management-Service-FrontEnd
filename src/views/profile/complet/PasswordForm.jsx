import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useFormContext } from '@contexts/ProfileComplete/FormContext';
import validationSchemas, { passwordSchema } from './validation';
import { TextField, Grid, Button, Typography, InputAdornment, IconButton, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

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

    const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        defaultValues: formData
    });

    const password = watch('password', formData.password);
    const confirmPassword = watch('confirmPassword', formData.confirmPassword);

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

    const onChangeHandler = (field, value) => {
        setValue(field, value);
        updateFormData({ [field]: value });
    };

    const onSubmit = data => {
        updateFormData(data);
        onNext();
    };

    const renderError = (name) => {
        const field = name.split('.').reduce((o, i) => o[i], validationSchemas);
        return errors[name] ? field.required : '';
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography className='font-medium' color='text.primary'>
                    تغییر رمز عبور
                </Typography>
                <Typography variant='body2'>رمز عبور جدید خود را تنظیم کنید</Typography>
            </Grid>
            <Grid item container spacing={2} xs={12} sm={6}>
                <Grid item xs={12}>
                    <Controller
                        name='password'
                        control={control}
                        rules={{
                            required: validationSchemas.passwordDetails.password.required,
                            minLength: validationSchemas.passwordDetails.password.minLength,
                            pattern: validationSchemas.passwordDetails.password.pattern
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label='رمز عبور'
                                type={isPasswordShown ? 'text' : 'password'}
                                error={!!errors.password}
                                helperText={errors.password ? errors.password.message : ''}
                                onChange={e => {
                                    onChangeHandler('password', e.target.value);
                                    field.onChange(e);
                                }}
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
                <Grid item xs={12}>
                    <Controller
                        name='confirmPassword'
                        control={control}
                        rules={{
                            required: validationSchemas.passwordDetails.confirmPassword.required,
                            validate: (value) => value === password || 'رمز عبور و تکرار آن باید یکسان باشند'
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label='تکرار رمز عبور'
                                type={isConfirmPasswordShown ? 'text' : 'password'}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
                                onChange={e => {
                                    onChangeHandler('confirmPassword', e.target.value);
                                    field.onChange(e);
                                }}
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
            </Grid>
            <Grid item xs={12} sm={6}>
                <List>
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
                </List>
            </Grid>
            <Grid item xs={12} className='flex justify-between'>
                <Button variant='outlined' onClick={onBack}>
                    بازگشت
                </Button>
                <Button variant='contained' onClick={handleSubmit(onSubmit)}>
                    ثبت
                </Button>
            </Grid>
        </Grid>
    );
};

export default PasswordForm;
