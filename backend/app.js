import Fastify from "fastify";
import multipart from "@fastify/multipart";
import { pipeline } from "stream";
import fs from "fs";
import util from "util";
import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import path from "path";
const MAX_ACTIVITIES = 20;
const pump = util.promisify(pipeline);
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
export const app = Fastify({
  logger: true,
});
// register
app.register(cors);
app.register(multipart, {
  limits: {
    fileSize: 30000000,
  },
});

app.register(fastifyStatic, {
  root: path.join(__dirname, "db", "img"),
  prefix: "/img/",
});

app.get("/records:start", async (request, reply) => {
  const start = parseInt(request.query.start ?? 0);
  const result = [];
  try {
    const recordsFile = fs.readFileSync("./db/records.json");
    const records = JSON.parse(recordsFile);
    for (let i = start; i < records.length; i++) {
      if (i < start + MAX_ACTIVITIES) {
        result.push(records[i]);
      }
    }
    reply.code(200).send({ data: result });
  } catch (error) {
    reply.code(500).send({ message: "Something went wrong", data: result });
  }
});

app.post("/upload", async function (request, reply) {
  const parts = request.parts();
  let records = [];
  try {
    // Read the existing records from the file
    const jsonData = fs.readFileSync("./db/records.json");
    records = JSON.parse(jsonData);
  } catch (err) {
    // Handle possible errors like file not existing
  }
  const latestRecord = {};
  for await (const part of parts) {
    if (part.type === "file") {
      // upload and save the file
      const path = `./db/img/${part.filename}`;
      latestRecord[part.fieldname] = part.filename;
      await pump(part.file, fs.createWriteStream(path));
      continue;
    }
    latestRecord[part.fieldname] = part.value;
  }

  records.push(latestRecord);

  fs.writeFileSync("./db/records.json", JSON.stringify(records, null, 2));
  reply.code(200).send({ data: latestRecord });
});
