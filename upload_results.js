const fs = require("fs");
const { parse } = require("csv-parse");
const { stringify } = require("csv-stringify");
const { Pool } = require("pg");
require("dotenv").config();

const results = "./results.csv";
const error_in_uploading = "./error_in_uploading.csv";

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

const week_number = 1;
let count = 0;
const writableStream = fs.createWriteStream(error_in_uploading);
const stringifier = stringify();
stringifier.write(["Week", `${week_number}`]);

async function upload_result(registration_number, score) {
  try {
    const client = await pool.connect();
    await client.query(
      `UPDATE student_scores SET week${week_number} = ${score} WHERE registration_number = '${registration_number}'`
    );
    client.release();
    count++;
    console.log(`${count}: Uploaded for ${registration_number}.`);
  } catch (error) {
    stringifier.write([registration_number, score]);
  }
}

fs.createReadStream(results)
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    const [registration_number, score] = row;
    upload_result(registration_number, score);
  });

stringifier.pipe(writableStream);
