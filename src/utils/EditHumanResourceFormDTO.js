class HumanResourceDTO {
    constructor(apiData) {
        console.log(apiData)
        this.fullName = apiData.full_name;
        this.id = apiData.id;
        this.fatherName = apiData.father_name;
        this.nationalCode = apiData.nid;
        this.birthDate = apiData.birth_date;
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
        this.children = apiData.childrens.map(child => ({
            nid: child.nid,
            fullName: child.full_name,
            birthDate: child.birth_date,
            gender: child.gender,
        }));

        this.coveredVillages = apiData.covered_villages.map(village => ({
            villageCode: village.village_code
        }));
        this.contacts = apiData.contact_informations.map(contact => ({
            phoneNumber: contact.phone_number,
            socialNetwork: JSON.parse(contact.social_network),  // پارس کردن social_network
            description: contact.description,
        }));
    }

    static fromForm(formData) {
        return {
            full_name: formData.fullName,
            father_name: formData.fatherName,
            nid: formData.nid,
            birth_date: formData.birthDate,
            personal_id: formData.personalId,
            gender: formData.gender,
            married_status: formData.maritalStatus,
            birth_place: formData.birthPlace,
            issue_place: formData.issuePlace,
            eisargari_status: formData.veteranStatus,
            nezam_vazife: formData.militaryService,
            contract_type: formData.contractType,
            employment_status: formData.employmentStatus,
            description_contract: formData.descriptionContract,
            title_contract: formData.titleContract,
            education_histories: formData.educations,
            insurance_histories: formData.insurances,
            covered_villages: formData.coveredVillages,
            contacts: formData.contacts.map(contact => ({
                phone_number: contact.phoneNumber,
                social_network: contact.socialNetwork,
                description: contact.description,
            })),
            children: formData.children.map(child => ({
                nid: child.nid,
                full_name: child.fullName,
                birth_date: child.birthDate,
                gender: child.gender,
            })),
        };
    }
}

export default HumanResourceDTO;
