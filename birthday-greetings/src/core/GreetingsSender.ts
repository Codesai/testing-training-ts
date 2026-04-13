import {GreetingsMessage} from "./GreetingsMessage";

export interface GreetingsSender {
    send(messages: Array<GreetingsMessage>): void;
}