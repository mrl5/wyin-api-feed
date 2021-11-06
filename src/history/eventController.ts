import { Controller, Get, Path, Res, Route, TsoaResponse, Query } from 'tsoa';
import { Language, Time, Year } from './types';
import { EventService } from './eventService';
import { SingleHistoryEvent } from './singleHistoryEvent';
import { NotFoundEvent } from './notFoundEvent';
import { errors } from './errors';

@Route('history/event')
export class HistoryEventController extends Controller {
    @Get()
    async getEventByTime(
        @Res() notFoundResponse: TsoaResponse<404, NotFoundEvent>,
        @Query() t: Time,
        @Query() lang?: Language,
    ): Promise<SingleHistoryEvent> {
        try {
            const s = new EventService();
            const result = await s.getEventByTime(t, lang);
            return result;
        } catch (err) {
            if (err instanceof errors.NotFoundError) {
                return notFoundResponse(404, getNotFoundBody(err));
            }
            throw err;
        }
    }

    @Get('/{year}')
    async getEventByYear(
        @Res() notFoundResponse: TsoaResponse<404, NotFoundEvent>,
        @Path() year: Year,
        @Query() lang?: Language,
    ): Promise<SingleHistoryEvent> {
        try {
            const s = new EventService();
            const result = await s.getEventByYear(year, lang);
            return result;
        } catch (err) {
            if (err instanceof errors.NotFoundError) {
                return notFoundResponse(404, getNotFoundBody(err));
            }
            throw err;
        }
    }

    @Get('/random')
    async getEventByRandom(
        @Res() notFoundResponse: TsoaResponse<404, NotFoundEvent>,
        @Query() lang?: Language,
    ): Promise<SingleHistoryEvent> {
        try {
            const s = new EventService();
            const result = await s.getEventByRandom(lang);
            return result;
        } catch (err) {
            if (err instanceof errors.NotFoundError) {
                return notFoundResponse(404, getNotFoundBody(err));
            }
            throw err;
        }
    }
}

function getNotFoundBody(err: errors.NotFoundError): NotFoundEvent {
    const year = Number(err.year);
    return {
        year,
        body: err.message,
        code: err.code,
    };
}
