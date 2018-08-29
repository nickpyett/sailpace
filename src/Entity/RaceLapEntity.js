import UUID from 'uuid';

class RaceLapEntity {
    constructor(lapNumber) {
        this.id = UUID.v4();
        this.number = lapNumber;
    }
}

export default RaceLapEntity;
