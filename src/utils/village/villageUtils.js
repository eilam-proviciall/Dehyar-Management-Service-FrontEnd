export function getVillageName(humanResourceData) {
    if (humanResourceData.last_contract.job_type_id === 1) {
        return humanResourceData.coveredVillages[0].village.approved_name
    } else if (humanResourceData.last_contract.job_type_id === 3 || humanResourceData.job_type_id === 4) {
        return humanResourceData.signature_data.village_employer.approved_name
    }
}

export function getContractRole(humanResourceData) {
    if (humanResourceData.last_contract.job_type_id === 1) {
        return {
            "contractClause2": "موارد خاتمه کار دهیار همان است که در ماده ۵۲ آیین نامه اجرایی تشکیلات,انتخابات داخلی و امورمالی شوراهای اسلامی روستا و نحوه انتخاب دهیار مصوب ۱۳۷۸واصلاحات بعدی آن پیش بینی شده است.",
            "contractClause3": "مدت مرخصی استحقاقی و مرخصی استعلاجی بر اساس ضوابط و مقررات قانون کار و قانون تامین اجتماعی می باشد.",
            "signNote": ` امضای ذیل این قرارداد از سوی بخشدار صرفا جهت اجرای ماده ۱۶ اساسنامه,تشکیلات و سازمان دهیاری ها مصوب ۱۳۸۰ و امضای ﻣﺴﺌﻮل امور مالی دهیاری به استناد ماده۱۱ آیین نامه استخدامی دهیاری های کشور مصوب ۱۳۸۳ می باشد.کارفرما در این قرارداد دهیاری ${getVillageName(humanResourceData)} است `
        }
    } else if (humanResourceData.last_contract.job_type_id === 3 || humanResourceData.last_contract.job_type_id === 4) {
        return {
            "contractClause2": "موارد خاتمه کار طرف قرارداد به استناد ماده ۲۱ قانون کار می باشد.",
            "contractClause3": "ماموریت و مرخصی امورمالی دهیاری به استناد اصلاحیه ماده ۱۲ آئین نامه استخدامی دهیاری های کشور با تایید بخشدار صورت می گیرد.",
            "signNote": ` امضای ذیل این قرارداد از سوی بخشدار صرفا جهت اجرای ماده ۱۶ اساسنامه ، تسهیلات و سازمان دهیاری ها مصوب ۱۳۸۰ و امضای مسئول امورمالی دهیاری دهیاری به استناد ماده ۱۱ آﺋین نامه استخدامی دهیاری های کشور می باشد دهیاری ${getVillageName(humanResourceData)}به نمایندگی از دهیاری های بند ۲ این قرارداد به عنوان دهیاری کارفرما تعیین می گردد `
        }
    }
}