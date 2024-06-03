import { v4 as uuidv4 } from 'uuid';

class RaceLapEntity {
    constructor(lapNumber) {
        this.id = uuidv4();
        this.number = lapNumber;
    }
}

export default RaceLapEntity;
