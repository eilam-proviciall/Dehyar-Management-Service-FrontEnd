class EditHumanResourceFormDTO {
    constructor(formData) {
        this.fullName = formData.fullName || '';
        this.fatherName = formData.fatherName || '';
        this.nationalCode = formData.nationalCode || '';
        this.birthDate = formData.birthDate || ''; // انتظار داریم که تاریخ به فرمت timestamp باشد
        this.phoneNumbers = formData.phoneNumbers || [];
        this.personalId = formData.personalId || '';
        this.gender = formData.gender === 'male' ? 'مرد' : 'زن';
        this.maritalStatus = formData.maritalStatus === 'single' ? 'مجرد' : 'متاهل';
        this.birthPlace = formData.birthPlace || '';
        this.issuancePlace = formData.issuancePlace || '';
        this.veteranStatus = formData.veteranStatus || '';
        this.militaryService = formData.militaryService || '';
        this.educations = formData.educations || [];
        this.insurances = formData.insurances || [];
        this.profilePicture = formData.profilePicture || '';
    }
    formatDate(timestamp) {
        const date = new Date(timestamp * 1000);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    }
}

export default EditHumanResourceFormDTO;
