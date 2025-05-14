import { DatabaseSync } from "node:sqlite";
import * as csv from "@std/csv";

const db = new DatabaseSync("data/db.sqlite");

export function createTables() {
  db.exec(
    `
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        matric_number TEXT NOT NULL UNIQUE,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        other_name TEXT,
        department TEXT,
        grades TEXT
    );
    `,
  );
}

export function seedDatabase() {
  function toTitleCase(str: string) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word: string) =>
        word
          .split("-")
          .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
          .join("-")
      )
      .join(" ");
  }

  const studentCsvData = Deno.readTextFileSync("data/students.csv");
  const students = csv.parse(studentCsvData, {
    skipFirstRow: true,
  });

  students.forEach((row) => {
    const names = row.names.split(" ");
    const lastName = names[0] ? toTitleCase(names[0]) : "";
    const firstName = names[1] ? toTitleCase(names[1]) : "";
    const otherName = names[2] ? toTitleCase(names[2]) : "";

    db.prepare(
      `
      INSERT OR IGNORE INTO students (matric_number, first_name, last_name, other_name, department, grades)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    ).run(
      row.matric_number,
      firstName,
      lastName,
      otherName,
      row.department,
      JSON.stringify({}),
    );
  });
}

createTables();
seedDatabase();

export function getStudentByMatricNumber(matric_number: number) {
  return db.prepare(
    `
    SELECT * FROM students WHERE matric_number = ?
    `,
  ).run(matric_number);
}

export function addStudent(
  student: {
    firstName: string;
    lastName: string;
    otherName?: string;
    matricNumber: string;
    department: string;
  },
) {}
