import { readFile } from 'fs';
import { promisify } from 'util';

export class WellKnownService {
    getSecurityTxt(): Promise<string> {
        const securityTxt = './src/static/security.txt';
        const r = promisify(readFile);
        return r(securityTxt, 'utf-8');
    }
}
