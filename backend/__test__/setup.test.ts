import * as dotenv from 'dotenv';
// import { describe, it, beforeAll } from '@jest/globals';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

describe('Some test', () => {
    beforeAll(() => {
        console.log('coming inside beforeAll', process.env);
    });

    it('should return a 200 status and a message', async () => {
        expect(true).toBe(true);
    });
});
