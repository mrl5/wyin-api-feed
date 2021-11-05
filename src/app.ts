import express, { Response as ExResponse, Request as ExRequest } from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import spec from '../spec/swagger.json';
import { RegisterRoutes } from '../build/routes';

export const app = express();

app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);
app.use(bodyParser.json());

app.use('/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
    return res.send(swaggerUi.generateHTML(spec));
});

RegisterRoutes(app);
