import React, { useEffect, useRef, useState, forwardRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FilterChip from '@core/components/mui/FilterButton';

// کامپوننت FilterChip با قابلیت ref
const ForwardedFilterChip = forwardRef((props, ref) => (
    <FilterChip {...props} innerRef={ref} />
));

const TableFilterChips = ({
    filters,
    activeFilter,
    onFilterChange,
    showAddButton = false,
    onAddClick
}) => {
    // تعریف state و ref
    const [highlightStyle, setHighlightStyle] = useState({ width: 0, right: 0 });
    const buttonRefs = useRef([]); // اینجا buttonRefs رو تعریف می‌کنیم

    const handleFilterChange = (status, index) => {
        onFilterChange(status);
        const button = buttonRefs.current[index];
        if (button) {
            const { offsetWidth, offsetLeft } = button;
            setHighlightStyle({ width: offsetWidth, right: offsetLeft });
        }
    };

    useEffect(() => {
        // تنظیم هایلایت اولیه روی دکمه "همه"
        if (buttonRefs.current[0]) {
            const { offsetWidth, offsetLeft } = buttonRefs.current[0];
            setHighlightStyle({ width: offsetWidth, right: offsetLeft });
        }
    }, []);

    return (
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
                className={'bg-backgroundPaper rounded-full'}
                sx={{
                    position: 'absolute',
                    height: '90%',
                    transition: 'width 0.3s, right 0.3s',
                    ...highlightStyle,
                }}
            />
            {showAddButton && (
                <Button
                    variant='contained'
                    onClick={onAddClick}
                    className={"rounded-full h-8"}
                >
                    <i className='ri-add-line' />
                </Button>
            )}
            {filters.map((filter, index) => (
                <ForwardedFilterChip
                    key={filter.value}
                    avatarValue={filter.count || "0"}
                    ref={el => buttonRefs.current[index] = el}
                    label={filter.label}
                    onClick={() => handleFilterChange(filter.value, index)}
                    clickable
                    variant={activeFilter === filter.value ? 'filled' : 'outlined'}
                    sx={{ color: activeFilter === filter.value ? 'white' : 'black' }}
                />
            ))}
        </Box>
    );
};

export default TableFilterChips;