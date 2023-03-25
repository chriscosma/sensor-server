import { MongoClient } from "https://deno.land/x/mongo@v0.31.2/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const client = new MongoClient();

let username, password;

const isDenoDeploy = Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;
if (isDenoDeploy) {
    username = Deno.env.get("USERNAME");
    password = Deno.env.get("PASSWORD");
} else {
    const mongo_config = config();
    username = mongo_config.USERNAME;
    password = mongo_config.PASSWORD;
}

await client.connect(
    `mongodb+srv://${username}:${password}@cluster0.v5uacbb.mongodb.net/readings?retryWrites=true&w=majority&authMechanism=SCRAM-SHA-1`
)

export { client };