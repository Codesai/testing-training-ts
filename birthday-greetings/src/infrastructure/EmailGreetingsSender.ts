import {EmailNotSentError} from "./EmailNotSentError";
import nodemailer, {Transporter} from "nodemailer";
import {MailOptions} from "nodemailer/lib/smtp-transport";
import {GreetingMessage} from "../core/GreetingMessage";
import {GreetingsSender} from "../core/GreetingsSender";

export class EmailGreetingsSender implements GreetingsSender {
    private readonly smtpHost: string;
    private readonly smtpPort: number;
    private readonly sender: string;

    constructor(smtpHost: string, smtpPort: number, sender: string) {
        this.smtpHost = smtpHost;
        this.smtpPort = smtpPort;
        this.sender = sender;
    }

    send(messages: Array<GreetingMessage>): void {
        for (const message of messages) {
            const recipient = message.to();
            const body = message.text();
            const subject = message.subject();
            this.sendTheMessage(subject, body, recipient);
        }
    }

    private sendTheMessage(subject: string, body: string, recipient: string): void {
        const transport = this.CreateMailSession();
        const msg = this.buildMessage(recipient, subject, body);
        this.sendMessage(msg, transport);
    }

    private buildMessage(recipient: string, subject: string, body: string) {
        return {
            from: this.sender,
            to: recipient,
            subject: subject,
            text: body
        };
    }

    private CreateMailSession() {
        return nodemailer.createTransport({
            host: this.smtpHost,
            port: this.smtpPort,
        });
    }

    // made protected for testing :-(
    protected sendMessage(msg: MailOptions, transport: Transporter): void {
        transport.sendMail(msg, (err: Error | null) => {
            if (err) {
                throw new EmailNotSentError(err);
            }
        });
    }
}