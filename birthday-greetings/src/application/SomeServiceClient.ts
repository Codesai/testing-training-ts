import {BirthdayService} from "./BirthdayService";
import {OurDate} from "../core/OurDate";
import {FileFriendsRepository} from "../infrastructure/repositories/FileFriendsRepository";
import {EmailGreetingsSender} from "../infrastructure/EmailGreetingsSender";

export class SomeServiceClient {

    async runService(): Promise<void> {
        const greetingsSender = new EmailGreetingsSender("localhost", 25, "sender@here.com");
        const service = new BirthdayService(new FileFriendsRepository("friends_data.txt"), greetingsSender);
        try {
            const today = new OurDate(new Date());
            await service.sendGreetings(today);
        } catch (e) {
            console.log(e);
        }
    }
}