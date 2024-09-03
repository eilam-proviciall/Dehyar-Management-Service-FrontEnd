// React Imports
import DividerSimple from '@/components/common/Divider/DividerSimple'
import { valibotResolver } from '@hookform/resolvers/valibot';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { minLength, object, string } from 'valibot';
import { centralityStatus } from '@data/centralityStatus'

const persianToEnglishDigits = (str) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const englishDigits = "0123456789";
    return str.replace(/[۰-۹]/g, (char) => englishDigits[persianDigits.indexOf(char)]);
};

const schema = object({
    hierarchical_code: string([minLength(1, 'این فیلد الزامی است')]),
    village_code: string([minLength(1, 'این فیلد الزامی است')]),
    nid: string([minLength(1, 'این فیلد الزامی است')]),
    wide: string([minLength(1, 'این فیلد الزامی است')]),
    centrality_status: string([minLength(1, 'این فیلد الزامی است')]),
    tourism_status: string([minLength(1, 'این فیلد الزامی است')]),
    postal_code: string([minLength(1, 'این فیلد الزامی است')]),
})

const StepBasicInformation = ({ data, setData }) => {
    const { control, formState: { errors } } = useForm({
        resolver: valibotResolver(schema),
        defaultValues: {
            hierarchical_code: data.hierarchical_code,
            village_code: data.village_code,
            nid: data.nid,
            wide: data.wide,
            centrality_status: data.centrality_status,
            tourism_status: data.tourism_status,
            postal_code: data.postal_code,
        }
    });

    const centralityStatus = [
        { value: 0, label: "نمیباشد" },
        { value: 1, label: "دهستان" },
        { value: 2, label: "بخش" },
        { value: 3, label: "شهرستان" },
        { value: 4, label: "استان" },
    ]

    const tourismStatus = [
        { value: 0, label: "نمیباشد" },
        { value: 1, label: "میباشد" }
    ]

    const [errorState, setErrorState] = useState(null)

    const renderTextField = (name, label, errorText) => (
        <FormControl fullWidth className='mbe-5'>
            <Controller
                name={name}
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                    <TextField
                        label={label}
                        value={value}
                        onChange={(e) => {
                            const value = persianToEnglishDigits(e.target.value);
                            setData(prevValues => ({ ...prevValues, [name]: value }));
                            onChange(value);
                            errorState !== null && setErrorState(null);
                        }}
                        error={!!errors[name]}
                        helperText={errors[name] ? errorText : ''}
                    />
                )}
            />
        </FormControl>
    );

    return (
        <Grid container spacing={2} mt={1}>
            <Grid item xs={12} mb={5}>
                <DividerSimple title={data.organization_type} />
            </Grid>
            <FormControl fullWidth >
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mb-5'>
                    {renderTextField('hierarchical_code', 'کد سلسله مراتبی', 'کد سلسله مراتبی الزامی است')}
                    {renderTextField('village_code', 'کد آبادی', 'کد آبادی مراتبی الزامی است')}
                    {renderTextField('nid', 'شناسه ملی', 'شناسه ملی مراتبی الزامی است')}
                    {renderTextField('wide', 'وسعت (هکتار)', 'وسعت مراتبی الزامی است')}
                    {renderTextField('wide', 'وسعت (هکتار)', 'وسعت مراتبی الزامی است')}
                    <FormControl>
                        <InputLabel id='tourism_status'>هدف گردشگری</InputLabel>
                        <Controller
                            name="tourism_status"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label='هدف گردشگری'
                                    onChange={e => {
                                        const newTourismStatus = e.target.value;
                                        setData(prevValues => ({ ...prevValues, tourism_status: data.tourism_status }));
                                        setTimeout(() => {
                                            setData(prevValues => ({ ...prevValues, tourism_status: newTourismStatus }));
                                            field.onChange(e);
                                        }, 0);
                                    }}
                                    fullWidth
                                >
                                    {Object.entries(tourismStatus.map(({ value, label }) => (
                                        <MenuItem key={value} value={label}>{label}</MenuItem>
                                    )))}
                                </Select>
                            )}
                        />
                    </FormControl>
                    {renderTextField('postal_code', 'کد پستی', 'کد پستی الزامی است')}
                    {renderTextField('postal_code', 'کد پستی', 'کد پستی الزامی است')}
                    <FormControl>
                        <InputLabel id='centrality_status'>مرکزیت</InputLabel>
                        <Controller
                            name="centrality_status"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label='مرکزیت'
                                    onChange={e => {
                                        const newSentrality = e.target.value;
                                        setData(prevValues => ({ ...prevValues, centrality_status: data.centrality_status_status }));
                                        setTimeout(() => {
                                            setData(prevValues => ({ ...prevValues, centrality_status: newSentrality }));
                                            field.onChange(e);
                                        }, 0);
                                    }}
                                    fullWidth
                                >
                                    {Object.entries(centralityStatus.map(({ value, label }) => (
                                        <MenuItem key={value} value={label}>{label}</MenuItem>
                                    )))}
                                </Select>
                            )}
                        />
                    </FormControl>
                </div>
            </FormControl>
        </Grid>
    )
}

export default StepBasicInformation