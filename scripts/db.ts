import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("db.sqlite");

db.exec(
    `
    CREATE TABLE IF NOT EXISTS graders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE
    );
    `,
);

db.exec(
    `
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL ,
        last_name TEXT NOT NULL,
        other_name TEXT NOT NULL,
        matric_number TEXT NOT NULL,
        grades TEXT NOT NULL
    );
    `,
);
