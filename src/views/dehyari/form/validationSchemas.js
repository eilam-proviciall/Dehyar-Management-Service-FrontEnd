const validationSchemas = {
    jobDetails: {
        jobTitle: {
            required: 'این فیلد الزامی است',
        },
        nationalCode: {
            required: 'این فیلد الزامی است',
            pattern: {
                value: /^[0-9]+$/,
                message: 'کد ملی باید فقط شامل اعداد باشد'
            }
        },
        coveredVillages: {
            required: 'این فیلد الزامی است',
        },
    },
    personalDetails: {
        firstName: {
            required: 'این فیلد الزامی است',
        },
        lastName: {
            required: 'این فیلد الزامی است',
        },
        fatherName: {
            required: 'این فیلد الزامی است',
        },
        phoneNumber: {
            required: 'این فیلد الزامی است',
        },
        personalId: {
            required: 'این فیلد الزامی است',
        },
        gender: {
            required: 'این فیلد الزامی است',
        },
        maritalStatus: {
            required: 'این فیلد الزامی است',
        },
        birthPlace: {
            required: 'این فیلد الزامی است',
        },
        issuancePlace: {
            required: 'این فیلد الزامی است',
        },
        veteranStatus: {
            required: 'این فیلد الزامی است',
        },
        militaryService: {
            required: 'این فیلد الزامی است',
        },
        birthDate: {
            required: 'این فیلد الزامی است',
        },
        postalCode: {
            required: 'این فیلد الزامی است',
            pattern: {
                value: /^[0-9]{10}$/,
                message: 'کدپستی باید ۱۰ رقم باشد'
            }
        },
        residenceAddress: {
            required: 'این فیلد الزامی است',
        },
        landlineNumber: {
            required: 'این فیلد الزامی است',
            pattern: {
                value: /^[0-9]{11}$/,
                message: 'شماره تماس ثابت باید ۱۱ رقم باشد'
            }
        },
    },
    education: {
        degree: {
            validate: (value, allValues) => {
                const { fieldOfStudy, graduationDate } = allValues;
                const anyFieldFilled = value || fieldOfStudy || graduationDate;
                if (anyFieldFilled && !value) return 'این فیلد الزامی است';
                return true;
            }
        },
        fieldOfStudy: {
            validate: (value, allValues) => {
                const { degree, graduationDate } = allValues;
                const anyFieldFilled = value || degree || graduationDate;
                if (anyFieldFilled && !value) return 'این فیلد الزامی است';
                return true;
            }
        },
        graduationDate: {
            validate: (value, allValues) => {
                const { degree, fieldOfStudy } = allValues;
                if (degree === 41) return true; // If the degree is "بی سواد"
                const anyFieldFilled = value || degree || fieldOfStudy;
                if (anyFieldFilled && !value) return 'این فیلد الزامی است';
                return true;
            }
        },
    },
    insurance: {
        workplace: {
            required: 'این فیلد الزامی است',
        },
        insurancesContractType: {
            required: 'این فیلد الزامی است',
        },
        insurancePeriod: {
            required: 'این فیلد الزامی است',
        },
        employmentStartDate: {
            required: 'این فیلد الزامی است',
        },
        employmentEndDate: {
            required: 'این فیلد الزامی است',
        },
    },
    children: {
        nationalCode: {
            validate: (value, { fullName, gender, birthDate, maritalStatus, marriageDate, endOfStudyExemption, deathDate }) => {
                if (maritalStatus === 'متاهل') {
                    const anyFieldFilled = value || fullName || gender || birthDate || marriageDate || endOfStudyExemption || deathDate;
                    if (anyFieldFilled && !value) return 'این فیلد الزامی است';
                }
                return true;
            }
        },
        fullName: {
            validate: (value, { nationalCode, gender, birthDate, maritalStatus, marriageDate, endOfStudyExemption, deathDate }) => {
                if (maritalStatus === 'متاهل') {
                    const anyFieldFilled = value || nationalCode || gender || birthDate || marriageDate || endOfStudyExemption || deathDate;
                    if (anyFieldFilled && !value) return 'این فیلد الزامی است';
                }
                return true;
            }
        },
        gender: {
            validate: (value, { nationalCode, fullName, birthDate, maritalStatus, marriageDate, endOfStudyExemption, deathDate }) => {
                if (maritalStatus === 'متاهل') {
                    const anyFieldFilled = value || nationalCode || fullName || birthDate || marriageDate || endOfStudyExemption || deathDate;
                    if (anyFieldFilled && !value) return 'این فیلد الزامی است';
                }
                return true;
            }
        },
        birthDate: {
            validate: (value, { nationalCode, fullName, gender, maritalStatus, marriageDate, endOfStudyExemption, deathDate }) => {
                if (maritalStatus === 'متاهل') {
                    const anyFieldFilled = value || nationalCode || fullName || gender || marriageDate || endOfStudyExemption || deathDate;
                    if (anyFieldFilled && !value) return 'این فیلد الزامی است';
                }
                return true;
            }
        },
        marriageDate: {
            validate: (value, { nationalCode, fullName, gender, birthDate, maritalStatus, endOfStudyExemption, deathDate }) => {
                if (maritalStatus === 'متاهل') {
                    const anyFieldFilled = value || nationalCode || fullName || gender || birthDate || endOfStudyExemption || deathDate;
                    if (anyFieldFilled && !value) return 'این فیلد الزامی است';
                }
                return true;
            }
        },
        endOfStudyExemption: {
            validate: (value, { nationalCode, fullName, gender, birthDate, maritalStatus, marriageDate, deathDate }) => {
                if (maritalStatus === 'متاهل') {
                    const anyFieldFilled = value || nationalCode || fullName || gender || birthDate || marriageDate || deathDate;
                    if (anyFieldFilled && !value) return 'این فیلد الزامی است';
                }
                return true;
            }
        },
        deathDate: {
            validate: (value, { nationalCode, fullName, gender, birthDate, maritalStatus, marriageDate, endOfStudyExemption }) => {
                if (maritalStatus === 'متاهل') {
                    const anyFieldFilled = value || nationalCode || fullName || gender || birthDate || marriageDate || endOfStudyExemption;
                    if (anyFieldFilled && !value) return 'این فیلد الزامی است';
                }
                return true;
            }
        },
    },
    contract: {
        descriptionContract: {
            required: 'این فیلد الزامی است',
        },
        titleContract: {
            required: 'این فیلد الزامی است',
        },
        contractType: {
            required: 'این فیلد الزامی است',
        },
        employmentStatus: {
            required: 'این فیلد الزامی است',
        },
        contractStart: {
            required: 'این فیلد الزامی است',
        },
        contractEnd: {
            required: 'این فیلد الزامی است',
        },
        execute_start: {
            required: 'این فیلد الزامی است',
        },
    },
};

export default validationSchemas;
