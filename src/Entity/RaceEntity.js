import { v4 as uuidv4 } from 'uuid';
import CompetitorSortEntity from 'Entity/CompetitorSortEntity';
import RaceLapEntity from 'Entity/RaceLapEntity';
import CompetitorLapEntity from 'Entity/CompetitorLapEntity';
import CompetitorEntity from 'Entity/CompetitorEntity';

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

        const raceLap = new RaceLapEntity(1);

        const competitor1LapEntity = new CompetitorLapEntity(raceLap);
        const competitor2LapEntity = new CompetitorLapEntity(raceLap);

        const competitor1 = new CompetitorEntity(1, [competitor1LapEntity]);
        const competitor2 = new CompetitorEntity(2, [competitor2LapEntity]);

        this.title = '';
        this.startDateTime = null;
        this.endDateTime = null;
        this.competitors = [competitor1, competitor2];
        this.laps = [raceLap];
        this.timeSinceStart = '00:00:00';
        this.dateTimeCreated = (new Date()).toUTCString();
    }
}

export default RaceEntity;
