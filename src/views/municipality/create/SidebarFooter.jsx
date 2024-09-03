import React from 'react';
import Button from '@mui/material/Button';

const SidebarFooter = ({ isUpdate, onReset, onSubmit, sidebarStatus }) => {
    return (
        <div className='flex gap-4'>
            <Button type='submit' variant='contained'>
                {sidebarStatus == "edit" ? 'به روزرسانی' : 'افزودن'}
            </Button>
            <Button variant='outlined' color='secondary' onClick={onReset}>
                بازنشانی
            </Button>
        </div>
    );
};

export default SidebarFooter;
