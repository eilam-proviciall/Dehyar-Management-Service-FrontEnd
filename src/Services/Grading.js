const BaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL


const getDivisonInformation = () => {
    return `${BaseUrl}/division-informations`
}

export { getDivisonInformation }