const validationSchemas = {
    // personalDetails: {
    //     firstName: {
    //         required: 'این فیلد الزامی است',
    //     },
    //     lastName: {
    //         required: 'این فیلد الزامی است',
    //     },
    //     fatherName: {
    //         required: 'این فیلد الزامی است',
    //     },
    //     personalId: {
    //         required: 'این فیلد الزامی است',
    //     },
    //     birthDate: {
    //         required: 'این فیلد الزامی است',
    //     },
    //     gender: {
    //         required: 'این فیلد الزامی است',
    //     },
    //     degree: {
    //         required: 'این فیلد الزامی است',
    //     },
    //     fieldOfStudy: {
    //         required: 'این فیلد الزامی است',
    //     },
    // },
    passwordDetails: {
        password: {
            required: 'این فیلد الزامی است',
            minLength: {
                value: 8,
                message: 'رمز عبور باید حداقل ۸ کاراکتر باشد'
            },
            pattern: {
                value: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?])/,
                message: 'رمز عبور باید شامل حرف بزرگ، حرف کوچک، عدد و علامت نگارشی باشد'
            }
        },
        confirmPassword: {
            required: 'این فیلد الزامی است',
            validate: (value, context) => value === context.password || 'رمز عبور و تکرار آن باید یکسان باشند'
        }
    }
};

export default validationSchemas;
