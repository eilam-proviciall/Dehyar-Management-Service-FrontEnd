const BaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL


const getCfoCoveredVillage = () => {
    return `${BaseUrl}/cfo-covered-village`
}

const getVillageEmployerDetail = () => {
    return `${BaseUrl}/village-employer/detail`
}

const getGeoData = () => {
    return `${BaseUrl}/country-division/geo-data`
}

const getState = () => {
    return `${BaseUrl}/country-division/state`
}

export { getCfoCoveredVillage, getVillageEmployerDetail, getGeoData, getState }