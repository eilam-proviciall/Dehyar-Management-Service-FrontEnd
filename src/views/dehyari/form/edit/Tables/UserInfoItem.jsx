import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const UserInfoItem = ({ icon, label, value }) => {
    return (
        <Box className={'flex items-center gap-2'}>
            <i className={icon} style={{ marginRight: 8 }}></i>
            <Typography variant="body2">{label}: {value}</Typography>
        </Box>
    );
};

export default UserInfoItem;