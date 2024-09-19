import React, { useEffect, useState } from 'react';
import { Grid, Autocomplete, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import DividerSimple from "@components/common/Divider/DividerSimple";

const LivingInformationInputs = ({ fieldKey, setData }) => {
    const { control, watch, setValue, formState: { errors } } = useFormContext();
    console.log("Field Key =>", fieldKey);

    const states = [
        { value: 1, name: "خراسان رضوی" },
        { value: 2, name: "خوزستان" },
        { value: 3, name: "فارس" },
    ];
    const [selectedState, setSelectedState] = useState([{ value: 0, name: '' }]);

    const cities = [
        {
            value: 1, citiesList: [
                { value: 1, name: 'مشهد' },
                { value: 2, name: 'نیشابور' },
                { value: 3, name: 'کاشمر' },
            ],
        },
        {
            value: 2, citiesList: [
                { value: 1, name: 'امیدیه' },
                { value: 2, name: 'باغ ملک' },
            ],
        },
        {
            value: 3, citiesList: [
                { value: 1, name: 'بیضاء' },
                { value: 2, name: 'بختگان' },
            ],
        },
    ];

    const selectedOrganizationType = watch("organization_type"); // مشاهده نوع سازمان انتخاب‌شده
    useEffect(() => {
        if (selectedOrganizationType === 'شهرداری') {
            setValue("dehestans", { value: 0, name: ' ' });
            setValue("villages", { value: 0, name: ' ' });
            setValue("departments", { value: 0, name: '' });
        } else {
            setValue("dehestans", { value: 0, name: '' });
            setValue("villages", { value: 0, name: '' });
            setValue("departments", { value: 0, name: ' ' });
        }
    }, [setValue, selectedOrganizationType])

    const renderAutocomplete = (name, label, options) => (
        <Controller
            name={name}
            control={control}
            defaultValue={null}
            render={({ field }) => {
                const selectedOption = options.find(
                    option => option.value === field.value?.value
                );
                return (
                    <Autocomplete
                        {...field}
                        options={options}
                        getOptionLabel={(option) => `${option.name}`}
                        isOptionEqualToValue={(option, value) =>
                            option.value === value?.value
                        }
                        onChange={(event, newValue) => {
                            field.onChange(newValue || null);
                            setData(prevData => ({ ...prevData, [name]: newValue }));
                            name == "states" && (setSelectedState(newValue && newValue.value - 1));
                        }}
                        value={selectedOption || null}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={label}
                                size="small"
                                fullWidth
                                error={errors[name]}
                                helperText={errors?.[name]?.message}
                            />
                        )}
                    />
                );
            }}
        />
    );


    return (
        fieldKey == 'municipality' ? (
            <Grid className='grid md:grid-cols-5 w-full gap-5'>
                {renderAutocomplete(`${fieldKey}.states`, "استان", states)}
                {renderAutocomplete(`${fieldKey}.cities`, "شهرستان", cities[selectedState] ? cities[selectedState].citiesList : [{}])}
                {renderAutocomplete(`${fieldKey}.regions`, "منطقه", cities[selectedState] ? cities[selectedState].citiesList : [{}])}
                {renderAutocomplete(`${fieldKey}.departments`, "بخش", cities[selectedState] ? cities[selectedState].citiesList : [{}])}
            </Grid>
        )
            : fieldKey == 'dehyari' && (
                <Grid className='grid md:grid-cols-5 w-full gap-5'>
                    {renderAutocomplete(`${fieldKey}.states`, "استان", states)}
                    {renderAutocomplete(`${fieldKey}.cities`, "شهرستان", cities[selectedState] ? cities[selectedState].citiesList : [{}])}
                    {renderAutocomplete(`${fieldKey}.regions`, "منطقه", cities[selectedState] ? cities[selectedState].citiesList : [{}])}
                    {renderAutocomplete(`${fieldKey}.dehestans`, "دهستان", cities[selectedState] ? cities[selectedState].citiesList : [{}])}
                    {renderAutocomplete(`${fieldKey}.villages`, "روستا", cities[selectedState] ? cities[selectedState].citiesList : [{}])}
                </Grid>
            )
    );
};

export default LivingInformationInputs;
