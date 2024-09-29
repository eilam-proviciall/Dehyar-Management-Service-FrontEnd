import PersonalOption from "@data/PersonalOption.json";
import {getJobTitleLabel} from "@data/jobTitles";
import contractType from "@data/contractType.json";

const {militaryServiceOptions, veteranStatusOptions, degreeOptions} = PersonalOption;

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatCurrency(num) {
    return `${formatNumber(num)}`;
}

function getVillageName(humanResourceData) {
    if (humanResourceData.last_contract.job_type_id === 1) {
        return humanResourceData.covered_villages[0].village.approved_name
    } else if (humanResourceData.last_contract.job_type_id === 3 || humanResourceData.job_type_id === 4) {
        return humanResourceData.signature_data.village_employer.approved_name
    }
}

function getContractRole(humanResourceData) {
    if (humanResourceData.job_type_id === 1) {
        return {
            "contractClause2": "موارد خاتمه کار دهیار همان است که در ماده ۵۲ آیین نامه اجرایی تشکیلات,انتخابات داخلی و امورمالی شوراهای اسلامی روستا و نحوه انتخاب دهیار مصوب ۱۳۷۸واصلاحات بعدی آن پیش بینی شده است.",
            "contractClause3": "مدت مرخصی استحقاقی و مرخصی استعلاجی بر اساس ضوابط و مقررات قانون کار و قانون تامین اجتماعی می باشد.",
            "signNote" : ` امضای ذیل این قرارداد از سوی بخشدار صرفا جهت اجرای ماده ۱۶ اساسنامه,تشکیلات و سازمان دهیاری ها مصوب ۱۳۸۰ و امضای ﻣﺴﺌﻮل امور مالی دهیاری به استناد ماده۱۱ آیین نامه استخدامی دهیاری های کشور مصوب ۱۳۸۳ می باشد.کارفرما در این قرارداد دهیاری ${getVillageName(humanResourceData)} است `
        }
    } else if (humanResourceData.job_type_id === 3 || humanResourceData.job_type_id === 4) {
        return {
            "contractClause2": "موارد خاتمه کار طرف قرارداد به استناد ماده ۲۱ قانون کار می باشد.",
            "contractClause3" : "ماموریت و مرخصی امورمالی دهیاری به استناد اصلاحیه ماده ۱۲ آئین نامه استخدامی دهیاری های کشور با تایید بخشدار صورت می گیرد.",
            "signNote":` امضای ذیل این قرارداد از سوی بخشدار صرفا جهت اجرای ماده ۱۶ اساسنامه ، تسهیلات و سازمان دهیاری ها مصوب ۱۳۸۰ و امضای مسئول امورمالی دهیاری دهیاری به استناد ماده ۱۱ آﺋین نامه استخدامی دهیاری های کشور می باشد دهیاری ${getVillageName(humanResourceData)}به نمایندگی از دهیاری های بند ۲ این قرارداد به عنوان دهیاری کارفرما تعیین می گردد `
        }
    }
}

function daysToMonths(days) {
    const daysInMonth = 30; // فرض اینکه هر ماه 30 روز است
    const months = Math.floor(days / daysInMonth); // به پایین گرد می‌کند
    return months;
}
class HumanResourceDTO {

    constructor(humanResourceData) {

        this.province = this.joinArray(humanResourceData.locationData.states);
        this.county = this.joinArray(humanResourceData.locationData.cities);
        this.section = this.joinArray(humanResourceData.locationData.regions);
        this.villageCount = humanResourceData.covered_villages?.length || 0;
        // this.villages = this.joinArray(humanResourceData.covered_villages?.map(village => village.village.approved_name));
        this.name = `${humanResourceData.first_name} ${humanResourceData.last_name}` || '';
        this.fatherName = humanResourceData.father_name || '';
        this.nationalId = humanResourceData.nid || '';
        this.maritalStatus = humanResourceData.married_status === 0 ? "مجرد" : "متاهل";
        this.idNumber = humanResourceData.personal_id || '';
        this.birthDate = humanResourceData.birth_date || '';
        this.gender = humanResourceData.gender === 0 ? "زن" : "مرد";
        this.childrenCount = humanResourceData.childrens?.length || 0;
        this.militaryStatus = militaryServiceOptions.find(option => option.value == humanResourceData.nezam_vazife)?.label || '';
        this.isaarStatus = veteranStatusOptions.find(option => option.value == humanResourceData.eisargari_status)?.label || '';
        this.birthPlace = humanResourceData.birth_place || '';
        this.issuePlace = humanResourceData.issue_place || '';
        this.education = degreeOptions.find(option => option.value == humanResourceData.last_degree.education_degree)?.title || '';
        this.major = humanResourceData.last_degree.education_field || '';
        this.experience = daysToMonths(humanResourceData.some_month_history) || '';
        this.contractStartDate = humanResourceData.last_contract.contract_start || '';
        this.contractEndDate = humanResourceData.last_contract.contract_end || '';
        this.appointmentDate = humanResourceData.last_contract.appointment_date || '';
        this.contractSubject = humanResourceData.last_contract.title_contract || '';
        this.contractDescription = humanResourceData.last_contract.description_contract || '';
        this.job_type_id = humanResourceData.job_type_id;
        this.covered_villages = humanResourceData.covered_villages;
        this.baseSalary = formatCurrency(humanResourceData.salary?.base_salary || 0);
        this.yearlyBase = formatCurrency(humanResourceData.salary?.history_benefits || 0);
        this.jobBonus = formatCurrency(humanResourceData.salary?.job_benefits || 0);
        this.totalFixedWage = formatCurrency((humanResourceData.salary?.job_benefits || 0) + (humanResourceData.salary?.history_benefits || 0) + (humanResourceData.salary?.base_salary || 0) + (humanResourceData.salary?.supervisor_benefits || 0));
        this.familyAllowance = formatCurrency(humanResourceData.salary?.child_benefits || 0);
        this.housingAllowance = formatCurrency(humanResourceData.salary?.home_benefits || 0);
        this.householdAllowance = formatCurrency(humanResourceData.salary?.food_benefits || 0);
        this.deprivationBonus = formatCurrency(humanResourceData.salary?.warzone_benefits || 0);
        this.married_benifits = formatCurrency(humanResourceData.salary?.married_benefits || 0);
        this.supervisor_benefits = formatCurrency(humanResourceData.salary?.supervisor_benefits || 0);
        this.veteransBonus = "۰";
        this.totalSalary = formatCurrency(this.calculateTotalSalary(humanResourceData.salary));
        this.contractClause1 = "طرف قرارداد تابع مقررات،ضوابط و آئین نامه های مربوط به دهیاری،قانون کار و قانون تامین اجتماعی بوده و از مزایای قوانین مذکور بهره مند می شود";
        this.contractClause2 = getContractRole(humanResourceData).contractClause2;
        this.contractClause3 = getContractRole(humanResourceData).contractClause3;
        this.contractClause4 = "مزایای پایان قرارداد طبق قانون کار و براساس حقوق و دستمزد مندرج در قرارداد از محل اعتبارات دهیاری های بند ۲ طرف قرارداد پرداخت می شود";
        this.commitment1 = "طرف قرارداد متهعد است مطابق شرح وظایف مندرج در مقررات و ضوابط،نسبت به انجام موضوع قرارداد اقدام کند";
        this.commitment2 = "طرف قرارداد اقرار می کند مشمول قانون منع مداخله کارکنان دولت در معالمات دولتی مصوب ۱۳۷۷ نیست";
        this.commitment3 = "عقد قرارداد هیچ گونه تعهدی مبنی بر استخدام اعم از رسمی یا پیمانی اعم از سوی دهیاری برای طرف قرارداد ایجاد نمی کند";
        this.commitment4 = "طرف قرارداد مسئول حفظ و نگهداری وسایل و اموال در اختیار است و در صورت ایجاد خسارت ،دهیاری می تواند از محل قرارداد خسارت را جبران کند";
        this.signingNote = getContractRole(humanResourceData).signNote;
        this.finalNote = "این قرارداد در ۵ نسخه تنظیم و هر نسخه حکم واحد را دارد و پس از امضا و مهر و ثبت معتبر خواهد بود";
        this.executionDate = humanResourceData.execute_start;
        this.uniqueId = humanResourceData.salary.unique_identifier || "پیش نویس";
        this.contractNumber = `۴۰۷ - ${this.executionDate}`;
        this.jobName = getJobTitleLabel(humanResourceData.job_type_id)
        this.contractType = contractType[humanResourceData.last_contract.contract_type]
        this.contract_type_id = humanResourceData.last_contract.contract_type
        this.villageEmployer = humanResourceData.village_employer
        this.remainDay = humanResourceData.salary?.remain_day != null ? formatCurrency(humanResourceData.salary.remain_day) : null;
        this.signatureData = humanResourceData.signature_data
        this.lastGrade = humanResourceData?.last_grade ?? null
        this.convertStatus = humanResourceData.convert_status
        this.villageName = getVillageName(humanResourceData)
    }

    joinArray(arr) {
        return (arr && arr.length > 0) ? arr.join(' / ') : '';
    }

    calculateTotalSalary(salary) {
        return (salary?.base_salary || 0) +
            (salary?.history_benefits || 0) +
            (salary?.job_benefits || 0) +
            (salary?.child_benefits || 0) +
            (salary?.home_benefits || 0) +
            (salary?.food_benefits || 0) +
            (salary?.warzone_benefits || 0) +
            (salary?.supervisor_benefits || 0) +
            (salary?.remain_day || 0) +
            (salary?.married_benefits || 0);
    }
}

export default HumanResourceDTO;
