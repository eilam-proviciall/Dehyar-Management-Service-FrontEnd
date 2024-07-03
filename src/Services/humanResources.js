const BaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL


const humanResources = () => {
    return `${BaseUrl}/human-resources`
}
const GetHumanResource = (id) => {
    return `${BaseUrl}/human-resources/human-resources/${id}`
}
const GetHumanResourcesForCfo = () => {
    return `${BaseUrl}/cfo/covered-villages`
}
const GetHumanCoverdVillageForCfo = () => {
    return `${BaseUrl}/cfo/village-statuses`
}
const GetHumanResourcesForBakhshdar = () => {
    return `${BaseUrl}/bakhshdar/villages-by-region`
}
const GetHumanResourcesForGovernor = () => {
    return `${BaseUrl}/governor/villages-by-state`
}
const GetJobTitles = () => {

    return `${BaseUrl}/job-titles`
}


export {
    humanResources,
    GetHumanResource,
    GetHumanResourcesForCfo,
    GetHumanResourcesForBakhshdar,
    GetHumanResourcesForGovernor,
    GetHumanCoverdVillageForCfo,
    GetJobTitles
}