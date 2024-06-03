import { v4 as uuidv4 } from 'uuid';

class RaceEntity {
    constructor(competitorSort) {
        this.id = uuidv4();
        this.title = '';
        this.startDateTime = null;
        this.endDateTime = null;
        this.competitors = [];
        this.laps = [];
        this.competitorSort = competitorSort;
        this.timeSinceStart = '00:00:00';
        this.dateTimeCreated = (new Date()).toUTCString();
    }
}

export default RaceEntity;
