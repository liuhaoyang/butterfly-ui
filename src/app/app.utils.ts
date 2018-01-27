export const utils = {
    toDisplayDuration(duration: number): string {
        return duration < 1000 ? duration + ' μs' : (duration / 1000.0).toFixed(2) + ' ms';
    }
};
