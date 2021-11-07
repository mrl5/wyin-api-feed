import * as wyin from '@spio-wyin/wyin-sdk-feed';
import conf from '../conf';
import { Language, SingleHistoryEvent } from './types';

const { DEFAULT_LANG } = conf;

export class EventService {
    async getEventByTime(time: wyin.Time, lang: Language = DEFAULT_LANG as Language): Promise<SingleHistoryEvent> {
        const result = await wyin.getEventByTime(time, lang, { throwOnNotFound: true });
        return result as SingleHistoryEvent;
    }

    async getEventByYear(year: wyin.Year, lang: Language = DEFAULT_LANG as Language): Promise<SingleHistoryEvent> {
        const result = await wyin.getEventByYear(year, lang, { throwOnNotFound: true });
        return result as SingleHistoryEvent;
    }

    async getEventByRandom(lang: Language = DEFAULT_LANG as Language): Promise<SingleHistoryEvent> {
        const result = await wyin.getEventByRandom(lang, { throwOnNotFound: true });
        return result as SingleHistoryEvent;
    }
}
