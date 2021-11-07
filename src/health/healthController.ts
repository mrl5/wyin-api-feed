import { Controller, Get, Route } from '@tsoa/runtime';
import { GenericHealth } from './health';
import { HealthService } from './healthService';

@Route('health')
export class HealthController extends Controller {
    @Get()
    async getGenericHealth(): Promise<GenericHealth> {
        return new HealthService().check();
    }
}
