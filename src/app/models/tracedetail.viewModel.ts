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

    serviceName: string;

    duration: number;

    offset: number;

    startTimestamp: Date;

    finishTimestamp: Date;

    displayDuration: string;

    displayOffset: number;

    displayWidth: number;
}

export class TraceTimelineViewModel {

    Q1: string = "0 μs";
    Q2: string = "0 μs";
    Q3: string = "0 μs";
    Q4: string = "0 μs";
    Q5: string = "0 μs";
    Q6: string = "0 μs";
    Q7: string = "0 μs";
    Q8: string = "0 μs";
}