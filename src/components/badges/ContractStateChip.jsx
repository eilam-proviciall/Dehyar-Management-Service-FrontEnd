import React from 'react';
import Chip from '@mui/material/Chip';
import Avatar from "@mui/material/Avatar";
import { useSettings } from "@core/hooks/useSettings";
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

const ContractStateChip = ({ avatar, label, onClick, customStyles }) => {
    const { settings } = useSettings();

    const getChipProps = () => {

        if (label?.startsWith('در انتظار')) {
            return {
                avatar: <Avatar className="bg-warning text-white flex items-center justify-center">{avatar}</Avatar>,
                color: 'warning'
            };
        }

        if (label?.startsWith('تایید شده')) {
            return {
                avatar: <Avatar className="bg-success text-white flex items-center justify-center">{avatar}</Avatar>,
                color: 'success'
            };
        }

        if (label?.startsWith('رد شده')) {
            return {
                avatar: <Avatar className="bg-error text-white flex items-center justify-center">{avatar} </Avatar>,
                color: 'error'
            };
        }

        // Default state
        return {
            avatar: avatar ? (
                <Avatar className="bg-info text-white flex items-center justify-center">
                    {avatar}
                </Avatar>
            ) : (
                <Avatar className="bg-info text-white flex items-center justify-center">
                    <i className="ri-close-fill" />
                </Avatar>
            ),
            color: 'info'
        };
    };

    const { avatar: chipAvatar, color } = getChipProps();

    return (
        <Chip
            avatar={chipAvatar}
            label={label}
            onClick={onClick}
            color={color}
            style={{
                textAlign: 'right',
                height: '28px',
                backgroundColor: `var(--mui-palette-${color}-lightOpacity)`,
                color: `var(--mui-palette-${color}-main)`,
                textShadow: '0px 0.5px 0.5px rgba(0, 0, 0, 0.1)',
                ...customStyles
            }}
        />
    );
};

export default ContractStateChip;