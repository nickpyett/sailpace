export default class DisplayTimeEntity {
    constructor(hours, minutes, seconds, milliseconds) {
        this.hours = this.parseIntOrZero(hours);
        this.minutes = this.parseIntOrZero(minutes);
        this.seconds = this.parseIntOrZero(seconds);
        this.milliseconds = this.parseIntOrZero(milliseconds);
    }

    getTimeInMilliseconds() {
        return (this.hours * 3600 * 1000)
            + (this.minutes * 60 * 1000)
            + (this.seconds * 1000)
            + this.milliseconds;
    }

    getInDisplayFormat() {
        return this.prependIntWithZeroes(this.hours, 2)
            + ':' + this.prependIntWithZeroes(this.minutes, 2)
            + ':' + this.prependIntWithZeroes(this.seconds, 2)
            + '.' + this.prependIntWithZeroes(this.milliseconds, 3);
    }

    getInTimeFormat() {
        return this.prependIntWithZeroes(this.hours, 2)
            + ':' + this.prependIntWithZeroes(this.minutes, 2)
            + ':' + this.prependIntWithZeroes(this.seconds, 2);
    }

    static fromDisplayFormat(displayFormat) {
        const timeAndMilliseconds = displayFormat.split('.');

        const [hours, minutes, seconds] = timeAndMilliseconds[0].split(':');
        const milliseconds = timeAndMilliseconds[1];

        return new this(hours, minutes, seconds, milliseconds);
    }

    static fromMilliseconds(timeInMilliseconds) {
        const hours = Math.floor(timeInMilliseconds / 1000 / 60 / 60);

        timeInMilliseconds -= hours * 1000 * 60 * 60;

        const minutes = Math.floor(timeInMilliseconds / 1000 / 60);

        timeInMilliseconds -= minutes * 1000 * 60;

        const seconds = Math.floor(timeInMilliseconds / 1000);

        timeInMilliseconds -= seconds * 1000;

        return new this(hours, minutes, seconds, timeInMilliseconds);
    }

    prependIntWithZeroes(intToPrepend, stringLength) {
        let zeroes = '';

        for (let i = 0; i < (stringLength - 1); i++) {
            zeroes += '0';
        }

        return zeroes.concat(intToPrepend).slice(-stringLength);
    }

    parseIntOrZero(string) {
        return parseInt(string, 10) || 0;
    }
}
