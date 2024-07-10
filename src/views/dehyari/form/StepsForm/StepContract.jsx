import React from 'react';
import { Grid, TextField, FormControl, Typography } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DividerSimple from '@components/common/Divider/DividerSimple';

const StepContract = ({ validation }) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <>
            <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                    <DividerSimple title='اطلاعات قرارداد' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="titleContract"
                        control={control}
                        defaultValue=""
                        rules={validation.titleContract}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                size="small"
                                label="عنوان قرارداد"
                                placeholder="عنوان قرارداد"
                                {...field}
                                error={!!errors.titleContract}
                                helperText={errors.titleContract && errors.titleContract.message}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                        <Controller
                            name="execute_start"
                            control={control}
                            defaultValue={null}
                            rules={validation.contractStart}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <DatePicker
                                        value={value ? new Date(value * 1000) : ""}
                                        onChange={(date) => onChange(date ? date.toUnix() : null)}
                                        calendar={persian}
                                        locale={persian_fa}
                                        calendarPosition="bottom-right"
                                        render={<TextField
                                            fullWidth
                                            size="small"
                                            label="تاریخ اجرای قرارداد"
                                            error={!!errors.execute_start}
                                            placeholder="تاریخ اجرای قرارداد"
                                            inputProps={{ style: { textAlign: 'end' } }}
                                        />}
                                    />
                                    {errors.execute_start && <Typography color="error">{errors.execute_start.message}</Typography>}
                                </>
                            )}
                        />
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container spacing={2} mt={1}>
                <Grid item xs={12} sm={12}>
                    <Controller
                        name="descriptionContract"
                        control={control}
                        defaultValue=""
                        rules={validation.descriptionContract}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                multiline
                                size="small"
                                label="شرح قرارداد"
                                placeholder="شرح قرارداد"
                                {...field}
                                error={!!errors.descriptionContract}
                                helperText={errors.descriptionContract && errors.descriptionContract.message}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                        <Controller
                            name="contractStart"
                            control={control}
                            defaultValue={null}
                            rules={validation.contractStart}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <DatePicker
                                        value={value ? new Date(value * 1000) : ""}
                                        onChange={(date) => onChange(date ? date.toUnix() : null)}
                                        calendar={persian}
                                        locale={persian_fa}
                                        calendarPosition="bottom-right"
                                        render={<TextField
                                            fullWidth
                                            size="small"
                                            label="تاریخ شروع قرارداد"
                                            error={!!errors.contractStart}
                                            placeholder="تاریخ شروع قرارداد"
                                            inputProps={{ style: { textAlign: 'end' } }}
                                        />}
                                    />
                                    {errors.contractStart && <Typography color="error">{errors.contractStart.message}</Typography>}
                                </>
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                        <Controller
                            name="contractEnd"
                            control={control}
                            defaultValue={null}
                            rules={validation.contractStart}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <DatePicker
                                        value={value ? new Date(value * 1000) : ""}
                                        onChange={(date) => onChange(date ? date.toUnix() : null)}
                                        calendar={persian}
                                        locale={persian_fa}
                                        calendarPosition="bottom-right"
                                        render={<TextField
                                            fullWidth
                                            size="small"
                                            label="تاریخ پایان قرارداد"
                                            error={!!errors.contractEnd}
                                            placeholder="تاریخ پایان قرارداد"
                                            inputProps={{ style: { textAlign: 'end' } }}
                                        />}
                                    />
                                    {errors.contractEnd && <Typography color="error">{errors.contractEnd.message}</Typography>}
                                </>
                            )}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </>
    );
}

export default StepContract;
