    export const salaryToDTO = (data) => {
        return {
            job_type_id: data.jobTitle,
            nid: data.nationalCode,
            covered_villages: data.coveredVillages,
            full_name: data.fullName,
            father_name: data.fatherName,
            personal_id: data.personalId,
            gender: data.gender,
            married_status: data.maritalStatus,
            birth_place: data.birthPlace,
            issue_place: data.issuancePlace,
            eisargari_status: data.veteranStatus,
            nezam_vazife: data.militaryService,
            contract_type: data.contractType,
            employment_status: data.employmentStatus,
            contract_start: data.contractStart,
            contract_end: data.contractEnd,
            execute_start: data.contractStart, // Assuming execute_start is the same as contractStart
            description_contract: data.descriptionContract,
            title_contract: data.titleContract,
            educations: data.educations.map(education => ({
                education_degree: education.degree,
                education_field: education.fieldOfStudy,
                education_date: education.graduationDate
            })),
            insurances: data.insurances.map(insurance => ({
                dehyari_title: insurance.workplace,
                contract_type: insurance.insurancesContractType,
                month: insurance.insurancePeriod,
                insurance_type: insurance.insuranceType,
                start_date: insurance.employmentStartDate,
                end_date: insurance.employmentEndDate
            })),
            children: data.children.map(child => ({
                nid: child.nationalCode,
                full_name: child.fullName,
                birth_date: child.birthDate,
                death_date: child.deathDate,
                gender: child.gender,
                married_date: child.marriageDate,
                end_academic_deferment: child.endOfStudyExemption
            }))
        };
    };

    export const dtoToEmployee = (data) => {
        return {
            jobTitle: data.job_type_id,
            nationalCode: data.nid,
            coveredVillages: data.covered_villages,
            fullName: data.full_name,
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
