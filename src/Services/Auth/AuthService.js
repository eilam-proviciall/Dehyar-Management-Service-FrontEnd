const BaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL


const me = () => {
    return `${BaseUrl}/auth/me`
}
const login = () => {
    return `${BaseUrl}/auth/login`
}

const user = () => {
    return `${BaseUrl}/user`
}

const usersCount = () => {
    return `${BaseUrl}/users/count`
}


export { me, login, user, usersCount }