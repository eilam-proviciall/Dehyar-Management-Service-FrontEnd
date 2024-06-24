// SearchableSelect.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { debounce } from 'lodash';

const SearchableSelect = ({ apiService, label, optionLabelKey, dependentValue, initialLoad, onChange, disabled }) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [options, setOptions] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const fetchOptions = useCallback(async (page, query = '', dependentValue) => {
        const url = apiService(query, page, dependentValue);
        try {
            const response = await axios.get(url);
            const newOptions = response.data.data.data;
            if (newOptions.length === 0) {
                setHasMore(false);
            } else {
                if (page === 1) {
                    setOptions(newOptions); // Reset options for a new query
                } else {
                    setOptions(prevOptions => [...prevOptions, ...newOptions]); // Append to existing options
                }
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }, [apiService]);

    const debouncedFetchOptions = useCallback(debounce(fetchOptions, 300), [fetchOptions]);
    console.log(options)
    useEffect(() => {
        if (initialLoad) {
            fetchOptions(1, '', dependentValue);
        }
    }, [fetchOptions, dependentValue, initialLoad]);

    useEffect(() => {
        if (query.length >= 3) {
            debouncedFetchOptions(1, query, dependentValue);
        }
    }, [query, debouncedFetchOptions, dependentValue]);

    return (
        <Autocomplete
            open={open}
            size="small"
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            options={options}
            disabled={disabled}
            getOptionLabel={(option) => option[optionLabelKey] || ''}
            onInputChange={(_, newInputValue) => {
                if (newInputValue.length >= 3 && newInputValue !== query) {
                    setQuery(newInputValue);
                    setPage(1);
                    setHasMore(true);
                    setOptions([]); // Clear options before new fetch
                }
            }}
            onChange={onChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    variant="outlined"
                    disabled={disabled}
                />
            )}
            ListboxProps={{
                onScroll: (event) => {
                    const { scrollTop, scrollHeight, clientHeight } = event.target;
                    if (scrollHeight - scrollTop === clientHeight && hasMore) {
                        const nextPage = page + 1;
                        setPage(nextPage);
                        fetchOptions(nextPage, query, dependentValue);
                    }
                }
            }}
            isOptionEqualToValue={(option, value) => option.hierarchy_code === value.hierarchy_code}
        />
    );
};

export default SearchableSelect;
