import { v4 as uuidv4 } from 'uuid';
import CompetitorSortEntity from './CompetitorSortEntity';

class RaceEntity {
    constructor(id, competitorSort) {
        if (id) {
            this.id = id;
        } else {
            this.id = uuidv4();
        }

        if (competitorSort) {
            this.competitorSort = competitorSort;
        } else {
            this.competitorSort = new CompetitorSortEntity();
        }

        this.title = '';
        this.startDateTime = null;
        this.endDateTime = null;
        this.competitors = [];
        this.laps = [];
        this.timeSinceStart = '00:00:00';
        this.dateTimeCreated = (new Date()).toUTCString();
    }
}

export default RaceEntity;
