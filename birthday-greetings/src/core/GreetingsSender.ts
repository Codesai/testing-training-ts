import {GreetingMessage} from "./GreetingMessage";

export interface GreetingsSender {
    send(messages: Array<GreetingMessage>): void;
}