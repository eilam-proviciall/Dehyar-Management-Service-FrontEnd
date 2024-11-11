import React from 'react';
import { useTheme } from '@mui/material/styles';

const Loading = () => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <div className='flex h-full w-full justify-center items-center'>
            <img
                className='w-[15%]'
                src={isDarkMode ? "/images/icons/spier-dark.svg" : "/images/icons/spier.svg"}
                alt="در حال بارگذاری..."
            />
        </div>
    );
}

export default Loading;