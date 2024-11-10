const BaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

// const getState = () => {
//     return `${BaseUrl}/country-division/state`
// }

const getCity = () => {
    return `${BaseUrl}/country-division/city`
}
const getVillageInformationList = () => {
    return `${BaseUrl}/village-information/detail/list`
}

const getRegion = () => {
    return `${BaseUrl}/country-division/region`
}


export {getCity,getVillageInformationList,getRegion}