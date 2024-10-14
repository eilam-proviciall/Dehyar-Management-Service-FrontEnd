export class MissionDTO {
    constructor(missionDTO) {
        this.request_type = missionDTO.request_type == 1 && 'صدور حکم ماموریت' || missionDTO.request_type == 2 && 'تمدید ماموریت' || '';
        this.mission_type = missionDTO.mission_type == 1 && 'انفرادی' || missionDTO.mission_type == 2 && 'گروهی' || '';
        this.subject = missionDTO.subject || '';
        this.accommodation = missionDTO.accommodation == 1 && 'تامین شده' || missionDTO.accommodation == 2 && 'تامین شده' || '';
        this.transportation = missionDTO.transportation == 1 && 'اتوبوس' || missionDTO.transportation == 2 && 'هواپیما' || missionDTO.transportation == 3 && 'ماشین دولتی' || missionDTO.transportation == 4 && 'ماشین شخصی' || '';
        this.mission_duration = missionDTO.mission_duration == 1 && 'روز' || missionDTO.mission_duration == 2 && 'شب' || missionDTO.mission_duration == 3 && 'روز بدون توقف' || '';
        this.start_date = missionDTO.start_date || '';
        this.description = missionDTO.description || '';
        this.destination = missionDTO.destination || '';
    }
}