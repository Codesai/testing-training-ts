import {PressureSensor} from "./pressureSensor";

export class SimulatedPressureSensor implements PressureSensor {
    sampleValue(): number {
        const pressureTelemetryValue = this.samplePressure();
        return this.offset() + pressureTelemetryValue;
    }

    private offset(): number {
        return 16;
    }

    private samplePressure(): number {
        // placeholder implementation that simulate a real sensor in a real tire
        const pressureTelemetryValue = Math.floor(6 * Math.random() * Math.random());
        return pressureTelemetryValue;
    }
}