import swaggerUi from 'swagger-ui-express';
import swaggerJson from '@/openapi.json';

export default {
    serve: swaggerUi.serve,
    setup: swaggerUi.setup(swaggerJson),
};
