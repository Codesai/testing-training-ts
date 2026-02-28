import { Clock } from './Clock';
import { Configuration } from './Configuration';
import { CourseView } from './CourseView';

export class Course {
    private static readonly MAX_MINUTES_SHORT_COURSES = 10;

    private startTimeMs?: number;
    private durationInMinutes: number;

    public constructor(
        private readonly name: string,
        private readonly configuration: Configuration,
        private readonly clock: Clock,
        private readonly courseView: CourseView,
    ) {
        this.durationInMinutes = 0;
    }

    public showDetails(): void {
        this.courseView.displayLine(`Title: ${this.getTitle()}`);
        this.courseView.displayLine(`Duration: ${this.durationInMinutes} minutes`);
        this.courseView.displayLine(`Type: ${this.isShort() ? 'short' : 'long'}`);
    }

    public start(): void {
        this.startTimeMs = this.clock.now();
    }

    public end(): void {
        const endTimeMs = this.clock.now();
        this.durationInMinutes = this.computeMinutesBetween(this.startTimeMs, endTimeMs);
    }

    private isShort(): boolean {
        return this.durationInMinutes <= Course.MAX_MINUTES_SHORT_COURSES;
    }

    private getTitle(): string {
        return `${this.name} course in ${this.getCollege()} college`;
    }

    private computeMinutesBetween(startTimeMs: number | undefined, endTimeMs: number): number {
        if (startTimeMs === undefined) return 0;
        return Math.floor((endTimeMs - startTimeMs) / 60_000);
    }

    private getCollege(): string {
        const college = this.configuration.getValue('COLLEGE');
        if (college == null) {
            return 'ups! ->';
        }
        return college;
    }
}