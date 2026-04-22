import {SafetyRange} from "./safetyRange";
import {Display} from "./display";
import {PressureSensor} from "./pressureSensor";

export class Alarm {
    private readonly sensor: PressureSensor;
    private readonly safetyRange: SafetyRange;
    private readonly notifications: Notifications;
    private alarmOn: boolean;

    constructor(pressureSensor: PressureSensor, display: Display, safetyRange: SafetyRange) {
        this.sensor = pressureSensor;
        this.safetyRange = safetyRange;
        this.notifications = new Notifications(display);
        this.alarmOn = false;
    }

    check(): void {
        const value = this.sensor.sampleValue();

        if (this.safetyRange.contains(value)) {
            if (this.alarmOn) {
                this.alarmOn = false;
                this.notifications.notifyDeactivation();
            }
        } else {
            if (!this.alarmOn) {
                this.alarmOn = true;
                this.notifications.notifyActivation();
            }
        }
    }
}

class Notifications {
    private readonly display: Display;

    constructor(display: Display) {
        this.display = display;
    }

    public notifyActivation(): void {
        this.display.show("Alarm activated!");
    }

    public notifyDeactivation(): void {
        this.display.show("Alarm deactivated!");
    }
}
