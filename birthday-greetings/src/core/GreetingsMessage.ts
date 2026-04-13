import {Friend} from "./Friend";
import {Greeting} from "./Greeting";

export class GreetingsMessage {

    private readonly _to: string;
    private readonly _greeting: Greeting;

    constructor(to: string, greeting: Greeting) {
        this._to = to;
        this._greeting = greeting;
    }

    static generateForSome(friends: Array<Friend>): Array<GreetingsMessage> {
        return friends.map(GreetingsMessage.generateFor);
    }

    subject(): string {
        return this._greeting.header();
    }

    text(): string {
        return this._greeting.content();
    }

    to(): string {
        return this._to;
    }

    private static generateFor(friend: Friend): GreetingsMessage {
        const greeting = Greeting.forBirthdayOf(friend);
        const recipient = friend.getEmail();
        return new GreetingsMessage(recipient, greeting);
    }
}