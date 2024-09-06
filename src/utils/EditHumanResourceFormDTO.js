class HumanResourceDTO {
    constructor(apiData) {
        this.fullName = apiData.full_name;
        this.fatherName = apiData.father_name;
        this.nationalCode = apiData.nid;
        this.birthDate = apiData.birth_date ? new Date(apiData.birth_date * 1000) : '';
        this.personalId = apiData.personal_id;
        this.gender = apiData.gender;
        this.maritalStatus = apiData.married_status;
        this.birthPlace = apiData.birth_place;
        this.issuancePlace = apiData.issue_place;
        this.veteranStatus = apiData.eisargari_status;
        this.militaryService = apiData.nezam_vazife;
        this.phoneNumbers = JSON.parse(apiData.phone_numbers);
        this.educations = apiData.education_histories.map(education => ({
            degree: education.education_degree,
            fieldOfStudy: education.education_field,
            graduationDate: education.education_date ? new Date(education.education_date * 1000) : '',
        }));
        this.insurances = apiData.insurance_histories.map(insurance => ({
            startDate: insurance.start_date ? new Date(insurance.start_date * 1000) : '',
            endDate: insurance.end_date ? new Date(insurance.end_date * 1000) : '',
            month: insurance.month,
            dehyariTitle: insurance.dehyari_title,
            contractType: insurance.contract_type
        }));
        this.childrens = apiData.childrens.map(child => ({
            fullName: child.full_name,
            nid: child.nid,
            birthDate: child.birth_date ? new Date(child.birth_date * 1000) : '',
            gender: child.gender
        }));
        this.coveredVillages = apiData.covered_villages.map(village => ({
            villageCode: village.village_code
        }));
    }
}

export default HumanResourceDTO;
