import { Router } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import { Reading } from "./reading.ts";
import { client } from "./mongo.ts";

const router = new Router();

router.get("/", (ctx) => {
    ctx.response.body = "Plant Parenting Sensor Server";
});

router.post("/readings/add", async (ctx) => {
    const reading: Reading = await ctx.request.body().value;
    reading.timestamp = new Date();

    console.log("Inserting reading at", reading.timestamp);

    const db = client.database("readings");
    const readings = db.collection<Reading>("readings");
    await readings.insertOne(reading);

    ctx.response.status = 200;
});

export default router;