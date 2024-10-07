// accessControl.js

import WORK_GROUPS from './workGroups';

const accessControl = {
    [WORK_GROUPS.Dehyar]: [
        { label: <div className='flex items-center gap-2'>< i class="ri-survey-line" />مرخصی</div>, href: '/dehyari/form/time-off' },
        { label: <div className='flex items-center gap-2'>< i class="ri-sticky-note-add-line" />ماموریت</div>, href: '/dehyari/form/mission' },
        { label: <div className='flex items-center gap-2'>< i class="ri-car-line" />ماشین آلات</div>, href: '/dehyari/form/machinery' },
        { label: <div className='flex items-center gap-2'>< i class="ri-arrow-up-wide-fill" />ارتقاء درجه بندی</div>, href: '/dehyari/form/upgrade-village-rank' },
    ],
    [WORK_GROUPS.CFO]: [
        { label: <div className='flex items-center gap-2'>< i class="ri-group-line" />لیست پرسنل مسئول مالی</div>, href: '/dehyari/cfo/table' },
        { label: <div className='flex items-center gap-2'>< i class="ri-organization-chart" />تشکیلات دهیاری</div>, href: '/dehyari' },
        { label: <div className='flex items-center gap-2'>< i class="ri-upload-line" />ثبت اطلاعات پرسنلی</div>, href: '/dehyari/form' },
        { label: 'ویرایش اطلاعات پرسنلی', href: '/dehyari/form/edit', showOnSidebar: false },
    ],
    [WORK_GROUPS.Admin]: [
        { label: <div className='flex items-center gap-2'>< i class="ri-survey-line" />مرخصی</div>, href: '/dehyari/form/time-off' },
        { label: <div className='flex items-center gap-2'>< i class="ri-sticky-note-add-line" />ماموریت</div>, href: '/dehyari/form/mission' },
        { label: <div className='flex items-center gap-2'>< i class="ri-car-line" />ماشین آلات</div>, href: '/dehyari/form/machinery' },
        { label: <div className='flex items-center gap-2'>< i class="ri-arrow-up-wide-fill" />ارتقاء درجه بندی</div>, href: '/dehyari/form/upgrade-village-rank' },
        { label: <div className='flex items-center gap-2'>< i class="ri-group-line" />لیست پرسنل مسئول مالی</div>, href: '/dehyari/cfo/table' },
        { label: <div className='flex items-center gap-2'>< i class="ri-organization-chart" />تشکیلات دهیاری</div>, href: '/dehyari' },
        { label: <div className='flex items-center gap-2'>< i class="ri-upload-line" />ثبت اطلاعات پرسنلی</div>, href: '/dehyari/form' },
        { label: 'ویرایش اطلاعات پرسنلی', href: '/dehyari/form/edit', showOnSidebar: false },
        { label: <div className='flex items-center gap-2'>< i class="ri-error-warning-line" />جدول خطا ها</div>, href: '/admin/logtable' },
        { label: <div className='flex items-center gap-2'>< i class="ri-admin-line" />لیست نقش ها</div>, href: '/admin/roles' },
        { label: <div className='flex items-center gap-2'>< i class="ri-bar-chart-line" />درجه بندی</div>, href: '/dehyari/form/grading-information-registration' },
        { label: <div className='flex items-center gap-2'>< i class="ri-group-line" />لیست پرسنل استاندار</div>, href: '/dehyari/governor/table' },
        { label: <div className='flex items-center gap-2'><i className="ri-team-line" />مدیریت کاربران</div>, href: '/municipality/list' },
        { label: <div className='flex items-center gap-2'>< i class="ri-group-line" />لیست پرسنل بخشدار</div>, href: '/dehyari/bakhshdar/table' },
        { label: <div className='flex items-center gap-2'>< i class="ri-account-box-line" />صفحه عمومی</div>, href: '/profile/complete' },
    ],
    [WORK_GROUPS.GOVERNOR]: [
        { label: <div className='flex items-center gap-2'>< i class="ri-group-line" />لیست پرسنل استاندار</div>, href: '/dehyari/governor/table' },
        { label: <div className='flex items-center gap-2'><i className="ri-team-line" />مدیریت کاربران</div>, href: '/municipality/list' },
    ],
    [WORK_GROUPS.BAKHSHDAR]: [
        { label: <div className='flex items-center gap-2'>< i class="ri-group-line" />لیست پرسنل بخشدار</div>, href: '/dehyari/bakhshdar/table' },
    ],
    [WORK_GROUPS.PUBLIC]: [
        { label: <div className='flex items-center gap-2'>< i class="ri-account-box-line" />صفحه عمومی</div>, href: '/profile/complete' },
    ]
};

export default accessControl;
