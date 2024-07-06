// accessControl.js

import WORK_GROUPS from './workGroups';

const accessControl = {
    [WORK_GROUPS.CFO]: [
        {label: 'جدول امور مالی', href: '/dehyari/cfo/table'},
        {label: 'چارت سازمانی', href: '/dehyari'},
        {label: 'ایجاد فرد جدید', href: '/dehyari/form'},
    ],
    [WORK_GROUPS.GOVERNOR]: [
        {label: 'جدول استاندار', href: '/dehyari/governor/table'},

    ],
    [WORK_GROUPS.BAKHSHDAR]: [
        {label: 'جدول بخشدار', href: '/dehyari/bakhshdar/table'},
        {label: 'ایجاد کاربر', href: '/municipality/list'},
    ],
};

export default accessControl;
