import React from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, TextField, InputAdornment } from '@mui/material';

const CustomTextField = ({
    name,
    control,
    label,
    rules,
    error,
    helperText,
    adornment,
    onChangeCustom,
    ...props
}) => {
    return (
        <FormControl fullWidth margin="dense" {...props}>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label={label}
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        error={!!error}
                        helperText={helperText}
                        onChange={(e) => {
                            field.onChange(e);
                            if (onChangeCustom) {
                                onChangeCustom(name, e.target.value);
                            }
                        }}
                        InputProps={{
                            endAdornment: adornment ? (
                                <InputAdornment position="end">
                                    {adornment}
                                </InputAdornment>
                            ) : null,
                        }}
                    />
                )}
            />
        </FormControl>
    );
};

export default CustomTextField;