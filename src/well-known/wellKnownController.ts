import { Response as ExResponse, Request as ExRequest } from 'express';
import { Controller, Get, Hidden, Request, Route } from '@tsoa/runtime';
import { WellKnownService } from './wellKnownService';

@Hidden() // https://github.com/lukeautry/tsoa/issues/1126
@Route('/.well-known')
export class WellKnownController extends Controller {
    @Get('/security.txt')
    async getSecurityTxt(@Request() request: ExRequest): Promise<null> {
        const securityTxt = await new WellKnownService().getSecurityTxt();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const res = (<any>request).res as ExResponse;
        res.contentType('text/plain');
        res.send(securityTxt);
        return null;
    }
}
