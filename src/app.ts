import express, { Response as ExResponse, Request as ExRequest, NextFunction } from 'express';
import { ValidateError } from '@tsoa/runtime';
import { urlencoded, json } from 'body-parser';
import { serve, generateHTML } from 'swagger-ui-express';
import spec from '../spec/swagger.json';
import { RegisterRoutes } from '../build/routes';
import { BadRequestError } from './genericErrors';

export const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.get('/security.txt', (_req, res) => {
    res.redirect(301, '/.well-known/security.txt');
});

app.use('/docs', serve, async (_req: ExRequest, res: ExResponse) => {
    return res.send(generateHTML(spec));
});

RegisterRoutes(app);

app.use(function notFoundHandler(_req, res: ExResponse) {
    res.status(404).send({
        message: 'Not Found',
    });
});

app.use(function errorHandler(err: unknown, req: ExRequest, res: ExResponse, next: NextFunction): ExResponse | void {
    if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
            message: 'Validation Failed',
            details: err?.fields,
        });
    }

    if (err instanceof BadRequestError) {
        console.warn(`Caught BadRequestError for ${req.path}:`, err.message);
        return res.status(400).json({
            message: 'Bad Request',
            details: err?.message,
        });
    }

    if (err instanceof Error) {
        console.error(err);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }

    next();
});
