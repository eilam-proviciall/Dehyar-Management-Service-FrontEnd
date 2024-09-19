const BaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

const getGeoData = () => {
    return `${BaseUrl}/country-division/geo-data`
}
const getStateWithCitiesData = () => {
    return `${BaseUrl}/country-division/states-cities`
}

const getCfoCoveredVillage = () => {
    return `${BaseUrl}/cfo-covered-village`
}

const getVillageEmployerDetail = () => {
    return `${BaseUrl}/village-employer/detail`
}

export { getCfoCoveredVillage, getVillageEmployerDetail, getGeoData, getStateWithCitiesData }