import React, { useEffect, useState } from 'react';
import { Grid, Autocomplete, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import DividerSimple from "@components/common/Divider/DividerSimple";

const LivingInformationInputs = ({ state, handleStateCityChange, handleRegionChange, handleDehestanChange, fieldKey, setData }) => {
    const { control, formState: { errors } } = useFormContext();
    console.log("Field Key =>", fieldKey);

    return (
        <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={4}>
                <Controller
                    name={`${fieldKey}.state_city`}
                    control={control}
                    defaultValue={null}
                    render={({ field }) => {
                        const selectedOption = state.stateCities.find(
                            option => option.hierarchy_code === field.value?.hierarchy_code
                        );
                        return (
                            <Autocomplete
                                {...field}
                                options={state.stateCities}
                                getOptionLabel={(option) => `${option.approved_name}`}
                                isOptionEqualToValue={(option, value) =>
                                    option.hierarchy_code === value?.hierarchy_code
                                }
                                onChange={(event, newValue) => {
                                    field.onChange(newValue || null);
                                    handleStateCityChange(newValue);
                                }}
                                value={selectedOption || null}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="شهرستان"
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
                        const selectedOption = state.regions[0] ? (
                            state.regions[0].regions.find(
                                option => option.hierarchy_code === field.value?.hierarchy_code
                            )
                        ) : [];

                        return (
                            <Autocomplete
                                {...field}
                                options={state.regions[0] ? state.regions[0].regions : state.regions}
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
                        const selectedOption = state.dehestans[0] ? (
                            state.dehestans[0].dehestans.find(
                                option => option.hierarchy_code === field.value?.hierarchy_code
                            )
                        ) : [];

                        return (
                            <Autocomplete
                                {...field}
                                options={state.dehestans[0] ? state.dehestans[0].dehestans : state.dehestans}
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
                        console.log("State Regions => ", state.villages);

                        const selectedOption = state.villages[0] ? (
                            state.villages[0].villages.find(
                                option => option.hierarchy_code === field.value?.hierarchy_code
                            )
                        ) : [];
                        return (
                            <Autocomplete
                                {...field}
                                options={state.villages[0] ? state.villages[0].villages : state.villages}
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
