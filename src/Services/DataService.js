const BaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL


const getCfoCoveredVillage= () => {
    return `${BaseUrl}/cfo-covered-village`
}

const getVillageEmployerDetail =() => {
    return `${BaseUrl}/village-employer/detail`
}

export {getCfoCoveredVillage,getVillageEmployerDetail}