const BaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL


const getLogs = (HrId) => {
    return `${BaseUrl}/logs`
}

const getUsers = () => {
    return `${BaseUrl}/user`
}

const getUser = (id) => {
    return `${BaseUrl}/user/${id}`
}

const getVillageInformation = () => {
    return `${BaseUrl}/village-information/detail/list`
}

const getRoles = () => {
    return `${BaseUrl}/auth/roles`
}

export {
    getLogs,
    getUsers,
    getUser,
    getVillageInformation,
    getRoles,
}