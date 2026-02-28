import { CourseView } from '../domain/CourseView';

export class ConsoleCourseView implements CourseView {
    public displayLine(line: string): void {
        console.log(line);
    }
}