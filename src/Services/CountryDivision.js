const BaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL


const getCity = () => {
    return `${BaseUrl}/country-division/city`
}
const getVillageInformationList = () => {
    return `${BaseUrl}/village-information/detail/list`
}


export {getCity,getVillageInformationList}