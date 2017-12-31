
export class SpanDetailViewModel {

    spanId: string;

    sampled: boolean;

    operationName: string;

    serviceName: string;

    duration: number;

    displayDuration: string;

    startTimestamp: Date;

    finishTimestamp: Date;

    tags: KeyValuePair[] = [];

    logs: LogViewModel[] = [];
}

export class LogViewModel {

    timestamp: Date;

    fields: KeyValuePair[];
}

export class KeyValuePair {

    key: string;

    value: string;
}

export class LogFieldViewModel {

    timestamp: Date;

    name: string;

    value: string;

    showTimestamp: boolean;

    constructor(timestamp: Date, name: string, value: string) {
        this.timestamp = timestamp;
        this.value = value;
        this.showTimestamp = false;
        this.name = name;
    }
}