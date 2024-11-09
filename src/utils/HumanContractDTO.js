class HumanContractDTO {
    constructor(formData) {
        this.contract_start = formData.contractStart;
        this.contract_type = formData.contractType;
        this.contract_end = formData.contractEnd;
        this.execute_start = formData.executeStart;
        this.appointment_date = formData.appointmentDate;
        this.description_contract = formData.descriptionContract;
        this.title_contract = formData.titleContract;
        this.job_type_id = formData.jobTypeId;
        this.village_employer = formData.villageEmployer;
        this.main_work = formData.mainWork;
        this.human_resource_nid = formData.humanResourceNid;
        this.cover_village = formData.coveredVillages;
    }
    static fromForm(formData,nid) {
        return new HumanContractDTO({
            contractStart: formData.contractStart,
            contractType: formData.contractType,
            contractEnd: formData.contractEnd,
            executeStart: formData.contractExecute,
            appointmentDate: formData.appointmentDate,
            descriptionContract: formData.descriptionContract,
            titleContract: formData.titleContract,
            jobTypeId: formData.jobTitle,
            mainWork: formData.currentJob,
            humanResourceNid: nid,
            coveredVillages : formData.coveredVillages,
            villageEmployer : formData.villageEmployer,
        });
    }
}

export default HumanContractDTO;
