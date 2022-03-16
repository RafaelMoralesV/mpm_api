/* eslint-disable no-unused-vars */
declare namespace Express {
    export interface User {
        id: number;
    };
}
declare namespace NodeJS {
    export interface ProcessEnv {
        DB_USER: string;
        DB_PASS: string | null;
        DB_HOST: string;
        DB_TABLE: string;

        JWT_SECRET: string;
    }
}
