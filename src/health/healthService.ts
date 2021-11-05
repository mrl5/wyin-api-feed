import { GenericHealth, GenericHealthStatus } from './health';

export class HealthService {
    check(): GenericHealth {
        const health = { status: 'unhealthy' as GenericHealthStatus };
        if (isHealthy()) {
            health.status = 'healthy';
        }
        return health;
    }
}

function isHealthy(): boolean {
    return true;
}
