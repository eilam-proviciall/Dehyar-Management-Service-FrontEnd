export class GradingInformationDTO {
    constructor(gradingInformationData) {
        this.id = gradingInformationData.id || Date.now();
        this.organizationType = gradingInformationData.organization_type || '';
        this.hierarchicalCode = gradingInformationData.hierarchical_code || '';
        this.villageCode = gradingInformationData.village_code || '';
        this.nid = gradingInformationData.nid || '';
        this.dehyariStatus = gradingInformationData.dehyari_status || '';
        this.wide = gradingInformationData.wide || '';
        this.centralityStatus = gradingInformationData.centrality_status || '';
        this.tourismStatus = gradingInformationData.tourism_status || '';
        this.postalCode = gradingInformationData.postal_code || '';
        this.fireStation = gradingInformationData.fire_station || '';
        this.dateEstablished = gradingInformationData.date_established || '';
        this.dateGrading = gradingInformationData.date_grading || '';
        this.grade = gradingInformationData.grade || '';
        this.populationFields = gradingInformationData.population_fields || [{ year: '', population: '', family: '', man_count: '', woman_count: '' }];
        this.incomeFields = gradingInformationData.income_fields || [{ year: '', per_income: '' }];
    }
}