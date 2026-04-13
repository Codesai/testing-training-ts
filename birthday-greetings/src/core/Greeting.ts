import {Friend} from "./Friend";

export class Greeting {
    private readonly _header: string;
    private readonly _content: string;

    constructor(header: string, content: string) {
        this._header = header;
        this._content = content;
    }

    static forBirthdayOf(friend: Friend): Greeting {
        const content = `Happy Birthday, dear ${friend.getFirstName()}!`;
        const header = "Happy Birthday!";
        return new Greeting(header, content);
    }

    header(): string {
        return this._header;
    }

    content(): string {
        return this._content;
    }
}