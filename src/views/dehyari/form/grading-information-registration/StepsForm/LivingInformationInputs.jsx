import React, { useState } from 'react';
import { Grid, Autocomplete, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import DividerSimple from "@components/common/Divider/DividerSimple";

const LivingInformationInputs = ({ fieldKey }) => {
    const { control } = useFormContext();
    console.log("Field Key =>", fieldKey);

    const states = [
        { value: 0, name: "خراسان رضوی" },
        { value: 1, name: "خوزستان" },
        { value: 2, name: "فارس" },
    ];
    const [selectedState, setSelectedState] = useState([{ value: undefined, name: undefined }]);

    const cities = [
        {
            value: 0, citiesList: [
                { value: 0, name: 'مشهد' },
                { value: 1, name: 'نیشابور' },
                { value: 2, name: 'کاشمر' },
            ],
        },
        {
            value: 1, citiesList: [
                { value: 0, name: 'امیدیه' },
                { value: 1, name: 'باغ ملک' },
            ],
        },
        {
            value: 2, citiesList: [
                { value: 0, name: 'بیضاء' },
                { value: 1, name: 'بختگان' },
            ],
        },
    ];

    const renderAutocomplete = (name, label, options) => (
        <Controller
            name={name}
            control={control}
            defaultValue={null}
            render={({ field }) => {
                const selectedOption = options.find(
                    option => option.value === field.value?.value
                );

                console.log("Name =>", options);

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
                            name == "states" && (setSelectedState(newValue && newValue.value));
                        }}
                        value={selectedOption || null}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={label}
                                size="small"
                                fullWidth
                                error={!!field.error}
                                helperText={field.error && field.error.message}
                            />
                        )}
                    />
                );
            }}
        />
    );



    return (
        <Grid className='grid md:grid-cols-5 w-full gap-5'>
            {renderAutocomplete('states', "استان", states)}
            {renderAutocomplete('cities', "شهرستان", cities[selectedState] ? cities[selectedState].citiesList : [{}])}
            {renderAutocomplete('regions', "منطقه", cities[selectedState] ? cities[selectedState].citiesList : [{}])}
            {fieldKey == "شهرداری" && (
                renderAutocomplete('regions', "بخش", cities[selectedState] ? cities[selectedState].citiesList : [{}])
            )}
            {fieldKey == "دهیاری" && renderAutocomplete('dehestan', "دهستان", cities[selectedState] ? cities[selectedState].citiesList : [{}])}
            {fieldKey == "دهیاری" && renderAutocomplete('villages', "روستا", cities[selectedState] ? cities[selectedState].citiesList : [{}])}
        </Grid>
    );
};

export default LivingInformationInputs;
