    export const salaryToDTO = (formData) => {
        return {
            first_name: formData.firstName, // افزودن فیلد نام
            last_name: formData.lastName, // افزودن فیلد نام خانوادگی
            father_name: formData.fatherName,
            nid: formData.nationalCode,
            birth_date: formData.birthDate,
            personal_id: formData.personalId,
            gender: formData.gender,
            married_status: formData.maritalStatus,
            phone_numbers: formData.phoneNumbers,
            birth_place: formData.birthPlace,
            issue_place: formData.issuancePlace,
            eisargari_status: formData.veteranStatus,
            nezam_vazife: formData.militaryService,
            contract_type: formData.contractType,
            employment_status: formData.employmentStatus,
            description_contract: formData.descriptionContract,
            title_contract: formData.titleContract,
            insurance_identifier: formData.insuranceIdentifier,
            postal_code: formData.postalCode, // کدپستی
            residence_address: formData.residenceAddress, // آدرس محل سکونت
            landline_number: formData.landlineNumber, // شماره تماس ثابت
            profile_picture : formData.profilePicture,
            // profile_picture_base64: formData.profilePicture,

            educations: formData.educations.map(education => ({
                education_degree: education.degree, // ذخیره مدرک تحصیلی
                education_field: education.fieldOfStudy, // ذخیره کد رشته تحصیلی
                education_date: education.graduationDate, // تاریخ فارغ‌التحصیلی
            })),
            // insurances: formData.insurances,
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
                married_date: child.marriageDate,
                end_academic_deferment: child.endOfStudyExemption,
                death_date: child.deathDate,
            })),
        };
    };

    export const dtoToEmployee = (data) => {
        return {
            jobTitle: data.job_type_id,
            nationalCode: data.nid,
            coveredVillages: data.covered_villages.village_code, // تبدیل به آرایه
            fullName: data.full_name,
            firstName: data.first_name,
            lastName: data.last_name,
            fatherName: data.father_name,
            personalId: data.personal_id,
            gender: data.gender,
            maritalStatus: data.married_status,
            birthPlace: data.birth_place,
            issuancePlace: data.issue_place,
            veteranStatus: data.eisargari_status,
            militaryService: data.nezam_vazife,
            contractType: data.contract_type,
            employmentStatus: data.employment_status,
            contractStart: data.contract_start,
            contractEnd: data.contract_end,
            descriptionContract: data.description_contract,
            titleContract: data.title_contract,
            educations: data.education_histories.map(education => ({
                degree: education.education_degree,
                fieldOfStudy: education.education_field,
                graduationDate: education.education_date
            })),
            insurances: data.insurance_histories.map(insurance => ({
                workplace: insurance.dehyari_title,
                insurancePeriod: insurance.month,
                insuranceType: insurance.contract_type,
                employmentStartDate: insurance.start_date,
                employmentEndDate: insurance.end_date
            })),
            children: data.childrens.map(child => ({
                nationalCode: child.nid,
                fullName: child.full_name,
                birthDate: child.birth_date,
                deathDate: child.death_date,
                gender: child.gender,
                marriageDate: child.married_date,
                endOfStudyExemption: child.end_academic_deferment
            }))
        };
    };
