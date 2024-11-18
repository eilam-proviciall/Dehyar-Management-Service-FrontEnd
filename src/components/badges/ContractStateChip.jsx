import React from 'react';
import Chip from '@mui/material/Chip';

const ContractStateChip = ({ avatar,label, onClick, customStyles,...props }) => {
    return (
        <Chip
            avatar={avatar}
            label={label}
            onClick={onClick}
            style={{ textAlign: 'right', ...customStyles }}
            {...props}
        />
    );
};

export default ContractStateChip;