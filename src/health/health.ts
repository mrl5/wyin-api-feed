export interface GenericHealth {
    status: GenericHealthStatus;
}

export type GenericHealthStatus = 'healthy' | 'unhealthy';
