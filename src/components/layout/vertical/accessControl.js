// accessControl.js

import WORK_GROUPS from './workGroups';

const accessControl = {
    [WORK_GROUPS.CFO]: [
        { label: 'لیست پرسنل', href: '/dehyari/cfo/table' },
        { label: 'تشکیلات دهیاری', href: '/dehyari' },
        { label: 'ثبت اطلاعات پرسنلی', href: '/dehyari/form' },
        { label: 'ویرایش اطلاعات پرسنلی', href: '/dehyari/form/edit', showOnSidebar: false },
    ],
    [WORK_GROUPS.Admin]: [
        { label: 'جدول خطاها', href: '/admin/logtable' },
    ],
    [WORK_GROUPS.GOVERNOR]: [
        { label: 'لیست پرسنل', href: '/dehyari/governor/table' },
        { label: <div className='flex items-center gap-2'><i className="ri-team-line" />مدیریت کاربران</div>, href: '/municipality/list' },
    ],
    [WORK_GROUPS.BAKHSHDAR]: [
        { label: 'لیست پرسنل', href: '/dehyari/bakhshdar/table' },
    ],
    [WORK_GROUPS.PUBLIC]: [
        { label: 'صفحه عمومی', href: '/profile/complete' },
    ]
};

export default accessControl;
