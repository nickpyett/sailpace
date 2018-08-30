import UUID from 'uuid';

class RaceEntity {
    constructor(competitorSort) {
        this.id = UUID.v4();
        this.title = '';
        this.startDateTime = null;
        this.competitors = [];
        this.laps = [];
        this.competitorSort = competitorSort;
        this.timeSinceStart = '00:00:00';
        this.dateTimeCreated = (new Date()).toUTCString();
    }
}

export default RaceEntity;
