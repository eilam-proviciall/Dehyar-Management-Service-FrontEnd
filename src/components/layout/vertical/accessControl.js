// accessControl.js

import WORK_GROUPS from './workGroups';

const accessControl = {
    [WORK_GROUPS.CFO]: [
        { label: 'لیست پرسنل', href: '/dehyari/cfo/table' },
        { label: 'تشکیلات دهیاری', href: '/dehyari' },
        { label: 'ثبت اطلاعات پرسنلی', href: '/dehyari/form' },
    ],
    [WORK_GROUPS.Admin]: [
        { label: 'جدول خطاها', href: '/admin/logtable' },
        { label: 'گروه مجوز ها', href: '/admin/roles' },
    ],
    [WORK_GROUPS.GOVERNOR]: [
        { label: 'لیست پرسنل', href: '/dehyari/governor/table' },
        { label: 'کاربران سامانه', href: '/municipality/list' },
    ],
    [WORK_GROUPS.BAKHSHDAR]: [
        { label: 'لیست پرسنل', href: '/dehyari/bakhshdar/table' },
    ],
    [WORK_GROUPS.PUBLIC]: [
        { label: 'صفحه عمومی', href: '/profile/complete' },
    ]
};

export default accessControl;
