import UUID from 'uuid';

class CompetitorLapEntity {
    constructor(lap) {
        this.id = UUID.v4();
        this.lapId = lap.id;
        this.time = '';
    }
}

export default CompetitorLapEntity;
