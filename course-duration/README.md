# Course Duration kata

A kata to practice specification testing using test doubles.

## Specification

### Duration Tracking
1. A course initially has zero duration
2. When a course starts, the start time is recorded
3. When a course ends, the duration is calculated as the time elapsed between start and end times

### Course Classification
1. A course is classified as "short" if its duration is less than 10 minutes
2. A course is classified as "long" if its duration is 10 minutes or more

### Information Display
When showing course details on the console, the following information is presented in order:
1. The course title, which consists of:
    - The course name
    - The college name (obtained from configuration)
    - If no college name is configured, "not found" is used instead
2. The current duration in minutes
3. The course type (either "short" or "long")

### Order of Operations
1. A course must be started before it can track duration
2. Duration is only calculated after the course has ended
3. Course details can be displayed at any time, reflecting the current state of the course

## Help

[Use of test doubles with jest](https://gist.github.com/trikitrok/c35768c3f67e10f4f0c6ecb0320e64d7)

