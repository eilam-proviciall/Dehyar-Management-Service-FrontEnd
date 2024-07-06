import { object, string, custom, forward, minLength, regex } from 'valibot';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const personalSchema = object({
    fullName: string([minLength(1, 'این فیلد الزامی است')]),
    fatherName: string([minLength(1, 'این فیلد الزامی است')]),
    nationalId: string([minLength(1, 'این فیلد الزامی است')]),
    // birthDate: string([minLength(1, 'این فیلد الزامی است')]),
    gender: string([minLength(1, 'این فیلد الزامی است')]),
    // degree: string([minLength(1, 'این فیلد الزامی است')]),
    // fieldOfStudy: custom(
    //     (value, ctx) => {
    //         const degree = ctx.parent?.degree;
    //         if (degree && degree >= 44 && !value) {
    //             return 'رشته تحصیلی الزامی است';
    //         }
    //         return true;
    //     },
    //     'این فیلد الزامی است'
    // ),
});

export const passwordSchema = object({
    password: string([
        minLength(1, 'این فیلد الزامی است'),
        regex(passwordRegex, 'رمز عبور باید شامل حداقل یک حرف کوچک، یک حرف بزرگ و یک عدد باشد'),
    ]),
    confirmPassword: string([
        minLength(1, 'این فیلد الزامی است')
    ])
}, [
    forward(
        custom(input => input.password === input.confirmPassword, 'رمزهای عبور مطابقت ندارند'),
        ['confirmPassword']
    )
]);
