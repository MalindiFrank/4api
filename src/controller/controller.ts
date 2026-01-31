import { Context } from "@hono/hono/";
import {
  getCollectionArray,
  getItemById,
  getRandomItems,
} from "../services/service.ts";
import { logController, logError } from "../utils/logger.ts";
import { Color, Quote, Word } from "../models/models.ts";

export async function getHtml(c: Context): Promise<Response> {
  const html = await Deno.readTextFile("public/index.html");
  return c.html(html);
}

export async function getCollection(c: Context): Promise<Response> {
  try {
    const collection = c.req.path.split("/")[1];
    logController(`Getting all items from collection: ${collection}`);

    const collectables = await getCollectionArray(collection);

    logController(`Retrieved ${collectables.length} items from ${collection}`);
    return c.json({
      status: "OK",
      length: collectables.length.toString(),
      data: collectables,
    });
  } catch (error) {
    logError("Error in getCollection", error, { path: c.req.path });
    return c.json(
      { status: "ERROR", message: "Failed to retrieve collection" },
      500,
    );
  }
}

export async function getCollectionItemById(c: Context): Promise<Response> {
  try {
    const collection = c.req.path.split("/")[1];
    const id = c.req.param("id");
    const parsedId = Number.parseInt(id);

    logController(
      `Getting item by ID: ${parsedId} from collection: ${collection}`,
    );

    const collectables = await getItemById(collection, parsedId);

    if (!collectables) {
      logController(
        `Item not found: ID ${parsedId} in collection ${collection}`,
      );
      return c.json({ status: "ERROR", message: "Item not found" }, 404);
    }

    logController(`Retrieved item ID ${parsedId} from ${collection}`);
    return c.json({
      status: "OK",
      data: collectables,
    });
  } catch (error) {
    logError("Error in getCollectionItemById", error, {
      path: c.req.path,
      id: c.req.param("id"),
    });
    return c.json({ status: "ERROR", message: "Failed to retrieve item" }, 500);
  }
}

export async function getRandomCollectionItem(c: Context): Promise<Response> {
  try {
    const collection = c.req.path.split("/")[1];
    logController(`Getting random item from collection: ${collection}`);

    const collectables = await getRandomItems(collection, 1);

    logController(`Retrieved random item from ${collection}`, {
      itemCount: collectables.length,
    });
    return c.json({
      status: "OK",
      data: collectables,
    });
  } catch (error) {
    logError("Error in getRandomCollectionItem", error, { path: c.req.path });
    return c.json(
      { status: "ERROR", message: "Failed to retrieve random item" },
      500,
    );
  }
}

export async function getNumberRandomItems(c: Context): Promise<Response> {
  try {
    const collection = c.req.path.split("/")[1];
    const n = c.req.param("n");
    const count = n ? Number.parseInt(n) : 1;

    logController(
      `Getting ${count} random items from collection: ${collection}`,
    );

    const collectables = await getRandomItems(collection, count);

    const response: {
      status: string;
      data: (Word | Quote | Color)[];
      length?: string;
    } = {
      status: "OK",
      data: collectables,
    };

    // Only include length if count is not 1
    if (count !== 1) {
      response.length = collectables.length.toString();
    }

    logController(
      `Retrieved ${collectables.length} random items from ${collection}`,
      {
        requestedCount: count,
        actualCount: collectables.length,
      },
    );

    return c.json(response);
  } catch (error) {
    logError("Error in getNumberRandomItems", error, {
      path: c.req.path,
      count: c.req.param("n"),
    });
    return c.json(
      { status: "ERROR", message: "Failed to retrieve random items" },
      500,
    );
  }
}
