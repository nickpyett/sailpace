import { v4 as uuidv4 } from 'uuid';

class CompetitorEntity {
    constructor(ordinal, competitorLaps) {
        this.id = uuidv4();
        this.ordinal = ordinal;
        this.name = '';
        this.number = '';
        this.class = '';
        this.laps = competitorLaps;
        this.timeTotal = '00:00:00.000';
    }
}

export default CompetitorEntity;
