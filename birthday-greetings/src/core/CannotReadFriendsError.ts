export class CannotReadFriendsError extends Error {
    constructor(cause: string) {
        super(cause);
    }
}