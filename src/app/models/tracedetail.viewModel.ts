export class TraceDetailViewModel {
    traceId: string;

    duration: number;

    startTimestamp: Date;

    finishTimestamp: Date;

    displayDuration: string;

    spans: SpanViewModel[] = [];
}

export class SpanViewModel {

    spanId: string;

    sampled: boolean;

    operationName: string;

    duration: number;

    startTimestamp: Date;

    finishTimestamp: Date;

    displayOffset: number;

    displayWidth: number;
}