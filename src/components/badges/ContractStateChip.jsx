import React from 'react';
import Chip from '@mui/material/Chip';
import Avatar from "@mui/material/Avatar";

const ContractStateChip = ({ avatar,label, onClick, customStyles }) => {
    return (
        <Chip
            avatar={<Avatar>{avatar || <i className={'ri-close-fill'}/>}</Avatar>}
            label={label}
            onClick={onClick}
            style={{ textAlign: 'center', alignItems:'center', ...customStyles }}
        />
    );
};

export default ContractStateChip;