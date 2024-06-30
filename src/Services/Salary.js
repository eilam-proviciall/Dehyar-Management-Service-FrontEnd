const BaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL


const getSalary = (HrId) => {
    return `${BaseUrl}/ahkam/salary/show?hr=${HrId}`
}

export {getSalary}