export class SafetyRange {
    private readonly lowerThreshold: number;
    private readonly higherThreshold: number;

    constructor(lowerThreshold: number, higherThreshold: number) {
        this.lowerThreshold = lowerThreshold;
        this.higherThreshold = higherThreshold;
    }

    contains(value: number): boolean {
        return value >= this.lowerThreshold && value <= this.higherThreshold;
    }
}