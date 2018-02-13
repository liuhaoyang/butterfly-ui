export class TraceViewModel {

    traceId: string;

    duration: number;

    startTimestamp: Date;

    finishTimestamp: Date;

    services: TraceServiceViewModel[];

    displayServices: DisplayServiceViewModel[];

    displayDuration: string;

    durationWidth: number;

}

export class TraceServiceViewModel {
    name: string;
}

export class DisplayServiceViewModel {

    name: string;
    count: number;

    constructor(name: string, count: number) {
        this.name = name;
        this.count = count;
    }
}

export class SearchTraceViewModel {

    service: string;

    startTimestamp: Date;

    finishTimestamp: Date;

    tags: string;

    limit: number;

    constructor() {
        this.limit = 10;
        this.finishTimestamp = new Date();
        this.startTimestamp = new Date();
        this.startTimestamp.setMinutes(this.startTimestamp.getMinutes() - 60);
    }
}

export class TraceHistogramViewModel{
    time: string;
    count: number;
}
