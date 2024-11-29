import React, { forwardRef } from 'react';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

// تبدیل کامپوننت به یک کامپوننت داینامیک که از props مختلف پشتیبانی می‌کند
const FilterChip = forwardRef(({ avatarValue, label, onClick, selected, variant = 'outlined', sx = {}, ...props }, ref) => {
    return (
        <Chip
            avatar={<Avatar>{avatarValue}</Avatar>}  // استفاده از آواتار داینامیک
            label={label}  // استفاده از متن داینامیک
            onClick={onClick}  // تابع کلیک داینامیک
            clickable
            variant={variant}  // نوع variant (مورد استفاده از prop)
            ref={ref}  // ریفرنس از بیرون
            sx={{
                boxShadow: selected ? 2 : 0,
                borderWidth: 1,
                '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'secondary.main',
                },
                ...sx,  // استایل داینامیک
            }}
            {...props} // سایر props اضافی
        />
    );
});

export default FilterChip;
