const BaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL


const humanResources = () => {
    return `${BaseUrl}/human-resources`
}
const GetHumanResource = (id) => {
    return `${BaseUrl}/human-resources/human-resources/${id}`
}


export {humanResources,GetHumanResource}