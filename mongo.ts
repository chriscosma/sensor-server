import { MongoClient } from "https://deno.land/x/atlas_sdk@v1.1.1/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

let apiKey;

const isDenoDeploy = Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;
if (isDenoDeploy) {
    apiKey = Deno.env.get("API_KEY");
} else {
    const mongo_config = config();
    apiKey = mongo_config.API_KEY;
}

const client = new MongoClient({
    endpoint: "https://us-east-1.aws.data.mongodb-api.com/app/data-mdjzg/endpoint/data/v1",
    dataSource: "Cluster0",
    auth: {
        apiKey: apiKey!
    }
});

export { client };