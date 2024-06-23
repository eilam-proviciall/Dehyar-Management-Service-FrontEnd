import FormControl from "@mui/material/FormControl";
import { Controller } from "react-hook-form";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const RoleFields = ({ role, control, errors, isLoading, options }) => {

    if (role && (!options || options.length === 0)) {
        return <Typography variant='body1'>داده‌ای یافت نشد</Typography>;
    }

    switch (role) {
        case "14":
            return (
                <FormControl fullWidth className='mbe-5'>
                    <Controller
                        name='geo_region'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                            isLoading ? (
                                <Typography variant='body1'>در حال بارگذاری...</Typography>
                            ) : (
                                <Autocomplete
                                    options={options}
                                    getOptionLabel={(option) => `${option.city.approved_name}-${option.approved_name}`}
                                    onChange={(event, newValue) => {
                                        onChange(newValue.hierarchy_code);
                                    }}
                                    getOptionSelected={(option, value) => option.hierarchy_code === value}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label='شهر'
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
                        name='villages'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                            isLoading ? (
                                <Typography variant='body1'>در حال بارگذاری...</Typography>
                            ) : (
                                <Autocomplete
                                    multiple
                                    options={options}
                                    getOptionLabel={(option) => `${option.city_name}-${option.approved_name}`}
                                    onChange={(event, newValue) => {
                                        onChange(newValue.map(item => item.hierarchy_code));
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label='روستا های تحت پوشش'
                                            value={value}
                                            onChange={onChange}
                                            error={!!errors.personalField1}
                                            helperText={errors.personalField1 ? 'انتخاب روستا های تحت پوشش الزامی سات' : ''}
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
