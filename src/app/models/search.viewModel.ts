export class TimestampSearchViewModel {

    startTimestamp: Date;

    finishTimestamp: Date;

    constructor() {
        this.finishTimestamp = new Date();
        this.startTimestamp = new Date();
        this.startTimestamp.setMinutes(this.startTimestamp.getMinutes() - 60);
    }
}