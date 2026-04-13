import {Friend} from "./Friend";

export interface FriendsRepository {
    allFriends(): Array<Friend>;
}