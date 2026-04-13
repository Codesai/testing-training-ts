import {OurDate} from "../core/OurDate";
import {Friend} from "../core/Friend";
import {FriendsRepository} from "../core/FriendsRepository";
import {GreetingsMessage} from "../core/GreetingsMessage";
import {GreetingsSender} from "../core/GreetingsSender";

export class BirthdayService {
    private readonly _friendsRepository: FriendsRepository;
    private _greetingsSender: GreetingsSender;

    constructor(friendsRepository: FriendsRepository, greetingsSender: GreetingsSender) {
        this._friendsRepository = friendsRepository;
        this._greetingsSender = greetingsSender;
    }

    sendGreetings(date: OurDate): void {
        this._greetingsSender.send(this.greetingMessagesFor(this.friendsHavingBirthdayOn(date)));
    }

    private greetingMessagesFor(friends: Array<Friend>): Array<GreetingsMessage> {
        return GreetingsMessage.generateForSome(friends);
    }

    private friendsHavingBirthdayOn(today: OurDate): Array<Friend> {
        return this._friendsRepository.allFriends().filter(
            (friend: Friend) => friend.isBirthday(today)
        );
    }
}
