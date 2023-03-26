import { Router } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import { Reading } from "./reading.ts";
import { client } from "./mongo.ts";

const router = new Router();

router.get("/", (ctx) => {
    ctx.response.body =
    `
    <html>
    <body>
    <iframe style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="960" height="720" src="https://charts.mongodb.com/charts-plant-parenting-nvnxo/embed/charts?id=642085f9-a2c6-422a-8039-9b783b52d88b&maxDataAge=60&theme=light&autoRefresh=true"></iframe>
    </body>
    </html>
    `;
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