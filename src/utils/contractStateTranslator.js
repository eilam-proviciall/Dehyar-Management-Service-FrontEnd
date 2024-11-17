export const translateContractState = (state) => {
    switch (state) {
        case 'draft':
            return 'پیش نویس';
        case 'pending_supervisor':
            return 'در انتظار تایید بخشدار';
        case 'approved_by_supervisor':
            return 'تایید شده توسط بخشدار';
        case 'rejected_by_supervisor':
            return 'رد شده توسط بخشدار';
        case 'pending_governor':
            return 'در انتظار تایید استاندار';
        case 'approved':
            return 'تایید شده نهایی';
        case 'rejected_to_supervisor':
            return 'رد شده به بخشدار';
        case 'rejected_to_financial_officer':
            return 'رد شده به مسئول مالی';
        default:
            return 'نامشخص';
    }
};