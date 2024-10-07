import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import { color } from 'framer-motion';

const CustomDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        width: '300px', // عرض را تنظیم کنید
        overflowY: 'auto', // اطمینان از وجود اسکرول بار عمودی
        color: 'red',
        '&::-webkit-scrollbar': {
            width: '6px', // عرض اسکرول بار
            color: 'red',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // رنگ اسکرول بار
            borderRadius: '4px', // گرد کردن گوشه‌ها
            color: 'red',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // رنگ در حالت hover
            color: 'red',
        },
    },
}));

export default CustomDrawer;