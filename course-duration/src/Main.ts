import { Course } from './domain/Course';
import { SystemClock } from './infrastructure/SystemClock';
import { EnvConfiguration } from './infrastructure/EnvConfiguration';
import { ConsoleCourseView } from './infrastructure/ConsoleCourseView';

async function main() {
    setCollegeName('Example');

    const clock = new SystemClock();
    const configuration = new EnvConfiguration();
    const courseView = new ConsoleCourseView();

    const course = new Course('TypeScript Testing', configuration, clock, courseView);

    console.log('Starting course...');
    course.start();

    await wait(60000);

    console.log('Ending course...');
    course.end();

    console.log('Course Details:');
    course.showDetails();
}

function wait(ms: number) {
    const minutes = ms / 60000;
    console.log(`Waiting for ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}...`);
    return new Promise(resolve => setTimeout(resolve, ms));
}

function setCollegeName(name: string) {
    process.env['COLLEGE'] = name;
}

main().catch(error => {
    console.error('An error occurred:', error);
});
