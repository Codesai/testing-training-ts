import {Display} from "./display";

export class ConsoleDisplay implements Display {
    show(message: string): void {
        console.log(message);
    }
}