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
            required: 'این فیلد الزامی است',
        },
        fieldOfStudy: {
            required: 'این فیلد الزامی است',
        },
        graduationDate: {
            required: 'این فیلد الزامی است',
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
            required: 'این فیلد الزامی است',
            pattern: {
                value: /^[0-9]+$/,
                message: 'کد ملی باید فقط شامل اعداد باشد'
            }
        },
        fullName: {
            required: 'این فیلد الزامی است',
        },
        gender: {
            required: 'این فیلد الزامی است',
        },
        birthDate: {
            required: 'این فیلد الزامی است',
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
