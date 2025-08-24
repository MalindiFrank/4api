import { JSONObject } from "@hono/hono/utils/types";
import { Word, Quote, Color } from "../models/models.ts";


export async function readJsonFile(filename: string): Promise<JSONObject> {
  const json = await JSON.parse(await Deno.readTextFile(filename)) as JSONObject;
  return json;
}

export async function getWords(): Promise<Word[]> {
  const json = await readJsonFile("./src/db/words.json");
  return (json["words"] as Word[]);
}

export async function getQuotes(): Promise<Quote[]> {
  const json = await readJsonFile("./src/db/quotes.json");
  return (json["quotes"] as Quote[]);
}

export async function getColors(): Promise<Color[]> {
  const json = await readJsonFile("./src/db/colors.json");
  return (json["colors"] as Color[]);
}
