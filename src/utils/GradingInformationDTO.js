export class GradingInformationDTO {
    constructor(gradingInformationData) {
        this.id = gradingInformationData.id || Date.now();
        this.organization = gradingInformationData.organization == 1 && 'شهرداری' || gradingInformationData.organization == 2 && 'دهیاری' || '';
        this.hierarchyCode = gradingInformationData.hierarchy_code || '';
        this.villageCode = gradingInformationData.village_code || '';
        this.nid = gradingInformationData.nid || '';
        this.dehyariStatus = gradingInformationData.dehyari_status || '';
        this.areaHectares = gradingInformationData.area_hectares || '';
        this.centralization = gradingInformationData.centralization == 0 && "نمیباشد" || gradingInformationData.centralization == 1 && "دهستان" || gradingInformationData.centralization == 2 && "بخش" || gradingInformationData.centralization == 3 && "شهرستان" || gradingInformationData.centralization == 4 && 'استان' || '';
        this.tourismGoal = gradingInformationData.tourism_goal == 0 && 'نمیباشد' || gradingInformationData.tourism_goal == 1 && 'میباشد' || '';
        this.postalCode = gradingInformationData.postal_code || '';
        this.fireStation = gradingInformationData.fire_station == 0 && 'ندارد' || gradingInformationData.fire_station == 1 && 'دارد' || '';
        this.foundationDate = gradingInformationData.foundation_date || '';
        this.gradeDate = gradingInformationData.grade_date || '';
        this.grade = gradingInformationData.grade || '';
        this.populations = gradingInformationData.populations || [{ year: '', population: '', households: '', male: '', female: '' }];
        this.incomeFields = gradingInformationData.incomes || [{ year: '', per_income: '' }];
    }
}