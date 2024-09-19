import React from 'react';
import {Grid, TextField, FormControl, Typography, InputLabel, Select, FormHelperText, MenuItem} from '@mui/material';
import {Controller, useFormContext} from 'react-hook-form';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

const StepTwoFields = ({ validation }) => {
    const { control, formState: { errors }, setValue, getValues } = useFormContext();

    return (
        <Grid container spacing={2}>
            {/* فیلدهای موجود در stepContract */}
            <Grid item xs={12} sm={6}>
                <Controller
                    name="titleContract"
                    control={control}
                    defaultValue=""
                    rules={validation.titleContract}
                    render={({ field }) => (
                        <FormControl fullWidth size="small" error={!!errors.titleContract}>
                            <InputLabel id="titleContract-label">عنوان قرارداد</InputLabel>
                            <Select
                                labelId="titleContract-label"
                                label="عنوان قرارداد"
                                {...field}
                            >
                                <MenuItem value="0">آیتم اول</MenuItem>
                                <MenuItem value="1">آیتم دوم</MenuItem>
                            </Select>
                            <FormHelperText>{errors.titleContract?.message}</FormHelperText>
                        </FormControl>
                    )}
                />
            </Grid>


            {/* فیلد تاریخ شروع قرارداد */}
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <Controller
                        name="contractStart"
                        control={control}
                        defaultValue={null}
                        rules={validation.contractStart}
                        render={({ field }) => (
                            <DatePicker
                                value={field.value ? new Date(field.value * 1000) : null}
                                onChange={(date) => field.onChange(date ? date.toUnix() : null)}
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition="bottom-right"
                                render={
                                    <TextField
                                        fullWidth
                                        label="تاریخ شروع قرارداد"
                                        size="small"
                                        error={!!errors.contractStart}
                                        helperText={errors.contractStart?.message}
                                    />
                                }
                            />
                        )}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <Controller
                        name="appointmentDate"
                        control={control}
                        defaultValue={null}
                        rules={validation.appointmentDate}
                        render={({ field }) => (
                            <DatePicker
                                value={field.value ? new Date(field.value * 1000) : null}
                                onChange={(date) => field.onChange(date ? date.toUnix() : null)}
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition="bottom-right"
                                render={
                                    <TextField
                                        fullWidth
                                        label="تاریخ انتصاب"
                                        size="small"
                                        error={!!errors.appointmentDate}
                                        helperText={errors.appointmentDate?.message}
                                    />
                                }
                            />
                        )}
                    />
                </FormControl>
            </Grid>
            {/* فیلد تاریخ پایان قرارداد */}
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <Controller
                        name="contractEnd"
                        control={control}
                        defaultValue={null}
                        rules={validation.contractEnd}
                        render={({ field }) => (
                            <DatePicker
                                value={field.value ? new Date(field.value * 1000) : null}
                                onChange={(date) => field.onChange(date ? date.toUnix() : null)}
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition="bottom-right"
                                render={
                                    <TextField
                                        fullWidth
                                        label="تاریخ پایان قرارداد"
                                        size="small"
                                        error={!!errors.contractEnd}
                                        helperText={errors.contractEnd?.message}
                                    />
                                }
                            />
                        )}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <Controller
                        name="contractExecute"
                        control={control}
                        defaultValue={null}
                        rules={validation.contractEnd}
                        render={({ field }) => (
                            <DatePicker
                                value={field.value ? new Date(field.value * 1000) : null}
                                onChange={(date) => field.onChange(date ? date.toUnix() : null)}
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition="bottom-right"
                                render={
                                    <TextField
                                        fullWidth
                                        label="تاریخ اجرای قرارداد"
                                        size="small"
                                        error={!!errors.contractExecute}
                                        helperText={errors.contractExecute?.message}
                                    />
                                }
                            />
                        )}
                    />
                </FormControl>
            </Grid>
            {/* فیلد توضیحات (یک خط کامل) */}
            <Grid item xs={12}>
                <Controller
                    name="descriptionContract"
                    control={control}
                    defaultValue=""
                    rules={validation.descriptionContract}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="شرح قرارداد"
                            size="small"
                            {...field}
                            error={!!errors.descriptionContract}
                            helperText={errors.descriptionContract?.message}
                        />
                    )}
                />
            </Grid>
        </Grid>
    );
};

export default StepTwoFields;
