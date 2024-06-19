import React from 'react'
import { Grid, Divider, Card, CardContent, IconButton, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useFormContext, useFieldArray } from 'react-hook-form'
import DeleteIcon from '@mui/icons-material/Delete'
import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import Button from "@mui/material/Button";

const StepChildren = () => {
    const { control, register, watch, setValue } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'children'
    })

    return (
        <>
            <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                    <Divider className='border-dashed' />
                </Grid>
                <Grid item xs={12}>
                    {fields.map((item, index) => (
                        <Card key={item.id} sx={{ mb: 2 }}>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            label="کد ملی"
                                            {...register(`children.${index}.nationalCode`)}
                                            value={watch(`children.${index}.nationalCode`)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            label="نام و نام خانوادگی"
                                            {...register(`children.${index}.fullName`)}
                                            value={watch(`children.${index}.fullName`)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>جنسیت</InputLabel>
                                            <Select
                                                {...register(`children.${index}.gender`)}
                                                label="جنسیت"
                                                value={watch(`children.${index}.gender`)}
                                            >
                                                <MenuItem value="male">مرد</MenuItem>
                                                <MenuItem value="female">زن</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <DatePicker
                                            calendar={persian}
                                            locale={persian_fa}
                                            calendarPosition="bottom-right"
                                            onChange={(date) => setValue(`children.${index}.birthDate`, date.unix)}
                                            value={watch(`children.${index}.birthDate`)}
                                            render={<TextField fullWidth size="small" label="تاریخ تولد" />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <DatePicker
                                            calendar={persian}
                                            locale={persian_fa}
                                            calendarPosition="bottom-right"
                                            onChange={(date) => setValue(`children.${index}.marriageDate`, date.unix)}
                                            value={watch(`children.${index}.marriageDate`)}
                                            render={<TextField fullWidth size="small" label="تاریخ ازدواج" />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <DatePicker
                                            calendar={persian}
                                            locale={persian_fa}
                                            calendarPosition="bottom-right"
                                            onChange={(date) => setValue(`children.${index}.endOfStudyExemption`, date.unix)}
                                            value={watch(`children.${index}.endOfStudyExemption`)}
                                            render={<TextField fullWidth size="small" label="پایان معافیت تحصیلی" />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <DatePicker
                                            calendar={persian}
                                            locale={persian_fa}
                                            calendarPosition="bottom-right"
                                            onChange={(date) => setValue(`children.${index}.deathDate`, date.unix)}
                                            value={watch(`children.${index}.deathDate`)}
                                            render={<TextField fullWidth size="small" label="تاریخ وفات" />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <IconButton color="error" aria-label="delete" size="large" onClick={() => remove(index)}>
                                            <DeleteIcon fontSize="inherit" />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    ))}
                    <Grid item xs={12} sx={{ px: 0 }} pt={5}>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => append({ nationalCode: '', fullName: '', gender: '', birthDate: '', marriageDate: '', endOfStudyExemption: '', deathDate: '' })}
                        >
                            افزودن
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default StepChildren
