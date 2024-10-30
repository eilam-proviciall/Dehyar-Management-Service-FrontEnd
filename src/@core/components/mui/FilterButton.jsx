import React from 'react';
import Button from '@mui/material/Button';
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

const FilterButton = ({ title, color, onClick }) => {
    return (
        // <button className={`flex gap-3 items-center justify-center text-center border-b-2 border-${color} p-2  cursor-pointer bg-transparent`} onClick={onClick}>
        //     <div className={`flex items-center justify-center h-5 w-5 rounded bg-${color} text-white`}>0</div>
        //     {title}
        // </button>
    <Chip
        avatar={<Avatar>0</Avatar>}
        label={title}
        variant="outlined"
        style={{
            textAlign: 'center',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
        }}
    />
    );
};

export default FilterButton;