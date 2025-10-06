import { JSONObject } from "@hono/hono/utils/types";
import { Word, Quote, Color } from "../models/models.ts";


export async function readJsonFile(filename: string): Promise<JSONObject> {
  const json = await JSON.parse(await Deno.readTextFile(filename)) as JSONObject;
  return json;
}

export async function getCollection(collection: string): Promise<Word[] | Quote[] | Color[]> {
  const json = await readJsonFile(`./src/db/${collection}.json`);
  return (json["words"] as (Word[] | Quote[] | Color[]));
}
