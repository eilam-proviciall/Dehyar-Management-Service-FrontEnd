const BaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL


const getMissions = () => {
    return `${BaseUrl}/missions`
}

export { getMissions }