const BaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL


const getLogs = (HrId) => {
    return `${BaseUrl}/logs`
}

export {getLogs}