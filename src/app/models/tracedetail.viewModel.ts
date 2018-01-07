export class TraceDetailViewModel {

    traceId: string;

    duration: number;

    startTimestamp: Date;

    finishTimestamp: Date;

    displayDuration: string;

    spans: SpanViewModel[] = [];

    services: number;
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

    children: SpanViewModel[];

    parent: SpanViewModel;

    expand: boolean;

    hasChildren: boolean;

    level: number;
}