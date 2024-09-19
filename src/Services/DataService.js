const BaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL


const getGeoData = () => {
    return `${BaseUrl}/country-division/geo-data`
}
const getStateWithCitiesData = () => {
    return `${BaseUrl}/country-division/states-cities`
}

const getCountryDivisionStates = () => {
    return `${BaseUrl}/country-division/state`
}

const getCountryDivisionCities = () => {
    return `${BaseUrl}/country-division/city`
}

const getCountryDivisionRegionByCity = () => {
    return `${BaseUrl}/country-division/region/by-city`
}

const getCountryDivisionDehestanByRegion = () => {
    return `${BaseUrl}/country-division/dehestan/by-region`
}

const getCountryDivisionVillageByDehestan = () => {
    return `${BaseUrl}/country-division/village/by-dehestan`
}

const getCfoCoveredVillage = () => {
    return `${BaseUrl}/cfo-covered-village`
}

const getVillageEmployerDetail = () => {
    return `${BaseUrl}/village-employer/detail`
}

export {
    getCfoCoveredVillage,
    getVillageEmployerDetail,
    getCountryDivisionCities,
    getCountryDivisionStates,
    getCountryDivisionRegionByCity,
    getCountryDivisionDehestanByRegion,
    getCountryDivisionVillageByDehestan
}