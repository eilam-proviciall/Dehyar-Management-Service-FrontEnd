const BaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL


const me = () => {
    return `${BaseUrl}/auth/me`
}
const login = () => {
    return `${BaseUrl}/auth/login`
}

const register = () => {
    return `${BaseUrl}/user`
}


export {me,login,register}