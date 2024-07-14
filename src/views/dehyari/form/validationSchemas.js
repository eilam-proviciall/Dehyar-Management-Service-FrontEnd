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
        fullName: {
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
            validate: (value, { fullName, gender, birthDate, maritalStatus }) => {
                if (maritalStatus === 'متاهل') {
                    const anyFieldFilled = value || fullName || gender || birthDate;
                    if (anyFieldFilled && !value) return 'این فیلد الزامی است';
                }
                return true;
            }
        },
        fullName: {
            validate: (value, { nationalCode, gender, birthDate, maritalStatus }) => {
                if (maritalStatus === 'متاهل') {
                    const anyFieldFilled = value || nationalCode || gender || birthDate;
                    if (anyFieldFilled && !value) return 'این فیلد الزامی است';
                }
                return true;
            }
        },
        gender: {
            validate: (value, { nationalCode, fullName, birthDate, maritalStatus }) => {
                if (maritalStatus === 'متاهل') {
                    const anyFieldFilled = value || nationalCode || fullName || birthDate;
                    if (anyFieldFilled && !value) return 'این فیلد الزامی است';
                }
                return true;
            }
        },
        birthDate: {
            validate: (value, { nationalCode, fullName, gender, maritalStatus }) => {
                if (maritalStatus === 'متاهل') {
                    const anyFieldFilled = value || nationalCode || fullName || gender;
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
