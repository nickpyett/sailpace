import { v4 as uuidv4 } from 'uuid';

class CompetitorLapEntity {
    constructor(lap) {
        this.id = uuidv4();
        this.lapId = lap.id;
        this.time = '';
    }
}

export default CompetitorLapEntity;
