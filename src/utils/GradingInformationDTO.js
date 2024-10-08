export class GradingInformationDTO {
    constructor(gradingInformationData) {
        this.id = gradingInformationData.id || Date.now();
        this.organization = gradingInformationData.organization || '';
        this.hierarchyCode = gradingInformationData.hierarchy_code || '';
        this.villageCode = gradingInformationData.village_code || '';
        this.nid = gradingInformationData.nid || '';
        this.dehyariStatus = gradingInformationData.dehyari_status || '';
        this.areaHectares = gradingInformationData.area_hectares || '';
        this.centralization = gradingInformationData.centralization || '';
        this.tourismGoal = gradingInformationData.tourism_goal || '';
        this.postalCode = gradingInformationData.postal_code || '';
        this.fireStation = gradingInformationData.fire_station || '';
        this.foundationDate = gradingInformationData.foundation_date || '';
        this.gradeDate = gradingInformationData.grade_date || '';
        this.grade = gradingInformationData.grade || '';
        this.populations = gradingInformationData.populations || [{ year: '', population: '', households: '', male: '', female: '' }];
        this.incomeFields = gradingInformationData.incomes || [{ year: '', per_income: '' }];
    }
}