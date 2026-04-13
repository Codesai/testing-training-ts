import {FriendsRepository} from "../../core/FriendsRepository";
import {Friend} from "../../core/Friend";
import {OurDate} from "../../core/OurDate";
import fs from "fs";
import {DateRepresentation} from "./DateRepresentation";
import {CannotReadFriendsError} from "../../core/CannotReadFriendsError";

export class FileFriendsRepository implements FriendsRepository {
    private readonly _path: string;

    constructor(path: string) {
        this._path = path;
    }

    allFriends(): Array<Friend> {
        const friends: Array<Friend> = [];
        this.readFileLines().forEach(
            (line: string) => {
                const friendData = line.split(", ");
                friends.push(this.createFriendFrom(friendData));
            }
        );
        return friends;
    }

    private createFriendFrom(friendData: string[]): Friend {
        return new Friend(getFirstName(), extractDate(), getEmail());

        function getFirstName(): string {
            return friendData[1];
        }
        function extractDate(): OurDate {
            const dateAsString = friendData[2];
            try {
                return new DateRepresentation(dateAsString).toDate();
            } catch (e) {
                throw new CannotReadFriendsError(`Badly formatted friend birth date: '${dateAsString}'`);
            }
        }

        function getEmail(): string {
            return friendData[3];
        }
    }

    private readFileLines(): string[] {
        try {
            let lines = fs.readFileSync(this._path, {encoding: 'utf8'}).split(/\r?\n/);
            return removeHeader(lines);
        } catch (e) {
            throw new CannotReadFriendsError(
                `Cannot load from file: '${this._path}'`
            );
        }

        function removeHeader(lines: string[]): string[] {
            return lines.slice(1);
        }
    }
}