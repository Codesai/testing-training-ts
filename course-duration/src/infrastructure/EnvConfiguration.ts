import { Configuration } from '../domain/Configuration';

export class EnvConfiguration implements Configuration {
    public getValue(key: string): string {
        return process.env[key] ?? '';
    }
}