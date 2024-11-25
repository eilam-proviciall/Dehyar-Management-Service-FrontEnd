import FormControl from "@mui/material/FormControl";
import { Controller } from "react-hook-form";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const RoleFields = ({ role, control, errors, isLoading, options, selectedOptions, setValue }) => {

    console.log("Selected ", selectedOptions);
    
    // if (role && (!options || options.length === 0)) {
    //     return <Typography variant='body1'>در حال دریافت داده ها...</Typography>;
    // }


    switch (role) {
        case "14":
            return (
                <FormControl fullWidth className='mbe-5'>
                    <Controller
                        name='geo_region'
                        control={control}
                        rules={{ required: true }}
                        defaultValue={
                            selectedOptions && options.find(option => selectedOptions === option.hierarchy_code) || null
                        }
                        render={({ field: { value, onChange } }) => (
                            isLoading ? (
                                <Typography variant='body1'>در حال بارگذاری...</Typography>
                            ) : (
                                <Autocomplete
                                    options={options}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => `${option.city.approved_name}-${option.approved_name}`}
                                    onChange={(event, newValue) => {
                                        setValue('geo_state',newValue.city.geo_state)
                                        setValue('geo_city',newValue.geo_cities)
                                        setValue('geo_region',newValue.hierarchy_code)
                                        onChange(newValue.hierarchy_code || null);
                                    }}
                                    defaultValue={
                                        selectedOptions && options.find(option => selectedOptions === option.hierarchy_code) || null
                                    }
                                    getOptionSelected={(option, value) => option.hierarchy_code === value}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label='منطقه'
                                            value={value}
                                            onChange={onChange}
                                            error={!!errors.geo_region}
                                            helperText={errors.geo_region ? 'منطقه الزامی است' : ''}
                                        />
                                    )}
                                />
                            )
                        )}
                    />
                </FormControl>
            );
        case "13":
            return (
                <FormControl fullWidth className='mbe-5'>
                    <Controller
                        name='covered_villages'
                        control={control}
                        rules={{ required: true }}
                        defaultValue={selectedOptions && options.filter(option => selectedOptions.some(selectedOption => selectedOption.village_code === option.hierarchy_code)) || []}
                        render={({ field: { value, onChange } }) => (
                            isLoading ? (
                                <Typography variant='body1'>در حال بارگذاری...</Typography>
                            ) : (
                                <Autocomplete
                                    multiple
                                    disableCloseOnSelect
                                    options={options}
                                    getOptionLabel={(option) => `${option.city_name}-${option.approved_name}`}
                                    onChange={(event, newValue) => {
                                        setValue('geo_state', newValue && newValue[0].geo_state)
                                        setValue('covered_villages', newValue.map(item => item.hierarchy_code || []));
                                        onChange(newValue.map(item => item || []));
                                    }}
                                    defaultValue={
                                        selectedOptions && options.filter(option => selectedOptions.some(selectedOption => selectedOption.village_code === option.hierarchy_code)) || []
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label='روستا های تحت پوشش'
                                            value={value}
                                            onChange={onChange}
                                            error={!!errors.personalField1}
                                            helperText={errors.personalField1 ? 'انتخاب روستا های تحت پوشش الزامی است' : ''}
                                        />
                                    )}
                                />
                            )
                        )}
                    />
                </FormControl>
            );
        case "16": return (
            <FormControl fullWidth className='mbe-5'>
                <Controller
                    name='geo_state'
                    control={control}
                    rules={{ required: true }}
                    defaultValue={selectedOptions && options.find(option => selectedOptions === option.hierarchy_code) || null}
                    render={({ field: { value, onChange } }) => (
                        isLoading ? (
                            <Typography variant='body1'>در حال بارگذاری...</Typography>
                        ) : (
                            <Autocomplete
                                disableCloseOnSelect
                                options={options}
                                getOptionLabel={(option) => `${option.approved_name}`}
                                onChange={(event, newValue) => {
                                    setValue('geo_state', newValue ? newValue.hierarchy_code : null);
                                    onChange(newValue ? newValue.hierarchy_code : null);
                                }}
                                defaultValue={
                                    selectedOptions && options.find(option => selectedOptions === option.hierarchy_code) || null
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label='استان مربوطه'
                                        value={value}
                                        onChange={onChange}
                                        error={!!errors.personalField1}
                                        helperText={errors.personalField1 ? 'انتخاب استان مربوطه الزامی است' : ''}
                                    />
                                )}
                            />
                        )
                    )}
                />
            </FormControl>
        );
        // Add other cases for different roles
        default:
            return null;
    }
};

export default RoleFields;
