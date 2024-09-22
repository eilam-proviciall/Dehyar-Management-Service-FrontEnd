import React, { useEffect, useState } from 'react';
import { Grid, Autocomplete, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import DividerSimple from "@components/common/Divider/DividerSimple";

const LivingInformationInputs = ({ state, handleStateCityChange, handleRegionChange, handleDehestanChange, fieldKey, setData }) => {
    const { control, formState: { errors } } = useFormContext();

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
                        onChange={(event, newValue) => {
                            field.onChange(newValue || null);
                            setData(prevData => ({ ...prevData, [name]: newValue }));
                            name == "states" && (setSelectedState(newValue && newValue.value - 1));
                        }}
                        isOptionEqualToValue={(option, value) => option.value === value?.value}
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

    // fieldKey == 'municipality' ? (
    //     <Grid className='grid md:grid-cols-5 w-full gap-5'>
    //         {renderAutocomplete(`${fieldKey}.states`, "استان", states)}
    //         {renderAutocomplete(`${fieldKey}.cities`, "شهرستان", cities[selectedState] ? cities[selectedState].citiesList : [{}])}
    //         {renderAutocomplete(`${fieldKey}.regions`, "منطقه", cities[selectedState] ? cities[selectedState].citiesList : [{}])}
    //         {renderAutocomplete(`${fieldKey}.departments`, "بخش", cities[selectedState] ? cities[selectedState].citiesList : [{}])}
    //     </Grid>
    // )
    //     : fieldKey == 'dehyari' && (
    //         <Grid className='grid md:grid-cols-5 w-full gap-5'>
    //             {renderAutocomplete(`${fieldKey}.states`, "استان", states)}
    //             {renderAutocomplete(`${fieldKey}.cities`, "شهرستان", cities[selectedState] ? cities[selectedState].citiesList : [{}])}
    //             {renderAutocomplete(`${fieldKey}.regions`, "منطقه", cities[selectedState] ? cities[selectedState].citiesList : [{}])}
    //             {renderAutocomplete(`${fieldKey}.dehestans`, "دهستان", cities[selectedState] ? cities[selectedState].citiesList : [{}])}
    //             {renderAutocomplete(`${fieldKey}.villages`, "روستا", cities[selectedState] ? cities[selectedState].citiesList : [{}])}
    //         </Grid>
    //     )

    return (
        <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={4}>
                <Controller
                    name={`${fieldKey}.state_city`}
                    control={control}
                    defaultValue={null}
                    render={({ field }) => {
                        const selectedOption = state.stateCities.find(
                            option => option.city_hierarchy_code === field.value?.city_hierarchy_code
                        );

                        return (
                            <Autocomplete
                                {...field}
                                options={state.stateCities}
                                getOptionLabel={(option) => `${option.state_name} - ${option.city_name}`}
                                isOptionEqualToValue={(option, value) =>
                                    option.city_hierarchy_code === value?.city_hierarchy_code
                                }
                                onChange={(event, newValue) => {
                                    field.onChange(newValue || null);
                                    handleStateCityChange(newValue);
                                }}
                                value={selectedOption || null}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="منطقه (استان - شهرستان)"
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
            </Grid>

            <Grid item xs={12} sm={4}>
                <Controller
                    name={`${fieldKey}.region`}
                    control={control}
                    defaultValue={null}
                    render={({ field }) => {
                        const selectedOption = state.regions.find(
                            option => option.hierarchy_code === field.value?.hierarchy_code
                        );

                        return (
                            <Autocomplete
                                {...field}
                                options={state.regions}
                                getOptionLabel={(option) => `${option.approved_name}`}
                                onChange={(event, newValue) => {
                                    field.onChange(newValue || null);
                                    handleRegionChange(newValue);
                                }}
                                isOptionEqualToValue={(option, value) => option.hierarchy_code === value?.hierarchy_code}
                                value={selectedOption || null}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="بخش"
                                        size="small"
                                        disabled={!state.selectedStateCity}
                                        error={!!field.error}
                                        helperText={field.error && field.error.message}
                                    />
                                )}
                            />
                        );
                    }}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <Controller
                    name={`${fieldKey}.dehestan`}
                    control={control}
                    defaultValue={null}
                    render={({ field }) => {
                        const selectedOption = state.dehestans.find(
                            option => option.hierarchy_code === field.value?.hierarchy_code
                        );

                        return (
                            <Autocomplete
                                {...field}
                                options={state.dehestans}
                                getOptionLabel={(option) => `${option.approved_name}`}
                                onChange={(event, newValue) => {
                                    field.onChange(newValue || null);
                                    handleDehestanChange(newValue);
                                }}
                                isOptionEqualToValue={(option, value) => option.hierarchy_code === value?.hierarchy_code}
                                value={selectedOption || null}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="دهستان"
                                        size="small"
                                        disabled={!state.selectedRegion}
                                        error={!!field.error}
                                        helperText={field.error && field.error.message}
                                    />
                                )}
                            />
                        );
                    }}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <Controller
                    name={`${fieldKey}.village`}
                    control={control}
                    defaultValue={null}
                    render={({ field }) => {
                        const selectedOption = state.villages.find(
                            option => option.hierarchy_code === field.value?.hierarchy_code
                        );

                        return (
                            <Autocomplete
                                {...field}
                                options={state.villages}
                                getOptionLabel={(option) => `${option.approved_name}`}
                                onChange={(event, newValue) => {
                                    field.onChange(newValue || null);
                                }}
                                isOptionEqualToValue={(option, value) => option.hierarchy_code === value?.hierarchy_code}
                                value={selectedOption || null}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="روستا"
                                        size="small"
                                        disabled={!state.selectedDehestan}
                                        error={!!field.error}
                                        helperText={field.error && field.error.message}
                                    />
                                )}
                            />
                        );
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default LivingInformationInputs;
