import { Clock } from '../domain/Clock';

export class SystemClock implements Clock {
    public now(): number {
        return Date.now();
    }
}