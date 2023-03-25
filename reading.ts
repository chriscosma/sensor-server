import { Timestamp } from "https://deno.land/x/mongo@v0.31.2/mod.ts";

export interface Reading {
    rel_hum: number,
    temp_f: number,
    timestamp?: Date
}