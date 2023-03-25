import { MongoClient } from "https://deno.land/x/mongo@v0.31.2/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const client = new MongoClient();

const mongo_config = config();
const username = mongo_config.USERNAME;
const password = mongo_config.PASSWORD;

await client.connect(
    `mongodb+srv://${username}:${password}@cluster0.v5uacbb.mongodb.net/readings?retryWrites=true&w=majority&authMechanism=SCRAM-SHA-1`
)

export { client };