import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Chip, Typography, IconButton } from '@mui/material';
import axios from 'axios';
import { Controller } from 'react-hook-form';
import { GetHumanCoverdVillageForCfo } from "@/Services/humanResources";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const CoveredVillagesSelect = ({ control, validation, errors, selectedJobTitle, setValue }) => {
    const [villages, setVillages] = useState([]);
    const [employerVillage, setEmployerVillage] = useState('');

    const handleEmployerVillageSelect = (villageCode) => {
        setValue("villageEmployer", villageCode);
        setEmployerVillage(villageCode);
    };

    useEffect(() => {
        const fetchVillages = async () => {
            try {
                if (selectedJobTitle) {
                    const response = await axios.get(GetHumanCoverdVillageForCfo(), {
                        params: { job_title: selectedJobTitle },
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                        },
                    });
                    setVillages(response.data);
                }
            } catch (error) {
                console.error('Error fetching villages:', error);
            }
        };

        fetchVillages();
    }, [selectedJobTitle]);

    return (
        <FormControl fullWidth size="small" error={!!errors.coveredVillages}>
            <InputLabel>دهیاری های تحت پوشش</InputLabel>
            <Controller
                name='coveredVillages'
                control={control}
                defaultValue={[]}
                rules={validation.coveredVillages}
                render={({ field }) => (
                    <Select
                        {...field}
                        label="دهیاری های تحت پوشش"
                        multiple
                        onChange={(e) => {
                            field.onChange(e.target.value);
                        }}
                        value={Array.isArray(field.value) ? field.value : []}
                        renderValue={(selected) => (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map(value => (
                                    <Chip
                                        key={value}
                                        label={villages.find(village => village.hierarchy_code === value)?.village_name}
                                        style={{
                                            backgroundColor: value === employerVillage ? 'gold' : 'default',
                                            color: value === employerVillage ? 'black' : 'default'
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                        disabled={!selectedJobTitle}
                    >
                        {villages.map((village) => (
                            <MenuItem
                                key={village.hierarchy_code}
                                value={village.hierarchy_code}
                                disabled={village.has_human_resource}
                            >
                                <IconButton
                                    onClick={() => handleEmployerVillageSelect(village.hierarchy_code)}
                                    edge="end"
                                    disabled={false}
                                >
                                    {employerVillage === village.hierarchy_code ? <StarIcon /> : <StarBorderIcon />}
                                </IconButton>
                                {village.village_name}

                            </MenuItem>
                        ))}
                    </Select>
                )}
            />
            {errors.coveredVillages && <Typography color="error">{errors.coveredVillages.message}</Typography>}
        </FormControl>
    );
};

export default CoveredVillagesSelect;
