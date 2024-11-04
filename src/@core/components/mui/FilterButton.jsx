import React, {forwardRef} from 'react';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

const FilterChip = forwardRef(({ avatarValue, label, onClick }, ref) => {
    return (
        <Chip
            avatar={<Avatar>{avatarValue}</Avatar>}
            label={label}
            onClick={onClick}
            clickable
            variant='outlined'
            className='text-textPrimary'
            ref={ref}
            sx={{
                boxShadow: 2,
                borderWidth: 1,
                '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                },
            }}
        />
    );
});


export default FilterChip;