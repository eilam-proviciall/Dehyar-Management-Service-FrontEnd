import {React} from 'react';
import {Grid, TextField, FormControl, InputLabel, Select, FormHelperText, MenuItem} from '@mui/material';
import {Controller, useFormContext} from 'react-hook-form';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import {convertUnixToJalali} from "@utils/dateConverter";

const StepTwoFields = ({validation}) => {
    const {control, formState: {errors}, getValues} = useFormContext();
    console.log("Start Date => ", getValues('contractStart'));
    console.log("End Date => ", getValues('contractEnd'));


    return (
        <Grid className='p-5 border-2 rounded-xl' container spacing={2}>
            <div className='grid grid-cols-1 w-full gap-5 my-5'>
                {/* فیلدهای موجود در stepContract */}
                <Controller
                    name="titleContract"
                    control={control}
                    defaultValue=""
                    rules={validation.titleContract}
                    render={({field}) => (
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
            </div>
            <div className='grid grid-cols-2 w-full gap-5'>
                {/* فیلد تاریخ شروع قرارداد */}
                <FormControl fullWidth>
                    <Controller
                        name="contractStart"
                        control={control}
                        defaultValue={null}
                        rules={validation.contractStart}
                        render={({field}) => (
                            <DatePicker
                                value={field.value ? convertUnixToJalali(field.value) : null}
                                onChange={(date) => field.onChange(date ? date.toUnix() : null)}
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition="bottom-right"
                                render={
                                    <TextField
                                        fullWidth
                                        label="تاریخ شروع قرارداد"
                                        size="small"
                                        inputProps={
                                            {
                                                style: {textAlign: "center"}
                                            }
                                        }
                                        error={!!errors.contractStart}
                                        helperText={errors.contractStart?.message}
                                    />
                                }
                            />
                        )}
                    />
                </FormControl>
                {/* فیلد تاریخ پایان قرارداد */}
                <FormControl fullWidth>
                    <Controller
                        name="contractEnd"
                        control={control}
                        defaultValue={null}
                        rules={validation.contractEnd}
                        render={({field}) => (
                            <DatePicker
                                value={field.value ? convertUnixToJalali(field.value) : null}
                                onChange={(date) => field.onChange(date ? date.toUnix() : null)}
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition="bottom-right"
                                render={
                                    <TextField
                                        fullWidth
                                        label="تاریخ پایان قرارداد"
                                        size="small"
                                        inputProps={
                                            {
                                                style: {textAlign: "center"}
                                            }
                                        }
                                        error={!!errors.contractEnd}
                                        helperText={errors.contractEnd?.message}
                                    />
                                }
                            />
                        )}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <Controller
                        name="appointmentDate"
                        control={control}
                        defaultValue={null}
                        rules={validation.appointmentDate}
                        render={({field}) => (
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
                                        inputProps={
                                            {
                                                style: {textAlign: "center"}
                                            }
                                        }
                                        error={!!errors.appointmentDate}
                                        helperText={errors.appointmentDate?.message}
                                    />
                                }
                            />
                        )}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <Controller
                        name="contractExecute"
                        control={control}
                        defaultValue={null}
                        rules={validation.contractEnd}
                        render={({field}) => (
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
                                        inputProps={
                                            {
                                                style: {textAlign: "center"}
                                            }
                                        }
                                        error={!!errors.contractExecute}
                                        helperText={errors.contractExecute?.message}
                                    />
                                }
                            />
                        )}
                    />
                </FormControl>
            </div>
            <div className='grid grid-cols-1 w-full gap-5 my-5'>
                {/* فیلد توضیحات (یک خط کامل) */}
                <Controller
                    name="descriptionContract"
                    control={control}
                    defaultValue=""
                    rules={validation.descriptionContract}
                    render={({field}) => (
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
            </div>
        </Grid>
    );
};

export default StepTwoFields;
