import { Color, Quote, Word } from "../models/models.ts";
import { getCollection } from "../utils/helper.ts";
import { logService, logError } from "../utils/logger.ts";

export async function getCollectionArray<T extends Word | Quote | Color>(
  collection: string,
): Promise<T[]> {
  try {
    logService(`Loading collection: ${collection}`);

    switch (collection) {
      case "words" :
      case "quotes":
      case "colors": {
        const collectable = await getCollection(collection) as T[];
        logService(`Loaded ${collection.length} ${collection}`);
        return collectable;
      }

      default: {
        logService(`Unknown collection requested: ${collection}`);
        return [];
      }
    }
  } catch (error) {
    logError(`Failed to load collection: ${collection}`, error);
    throw error;
  }
}

export async function getItemById<T extends Word | Quote | Color>(
  collection: string,
  id: number,
): Promise<T> {
  const collectable = await getCollectionArray<T>(collection);

  return collectable.find((item) => item.id === id) as T;
}

export async function getRandomItems<T extends Word | Quote | Color>(
  collection: string,
  count: number=1,
): Promise<T[]> {
  try {
    logService(`Getting ${count} random items from ${collection}`);

    const collectable = await getCollectionArray<T>(collection);

    if (count > collectable.length) {
      logService(`Requested count (${count}) exceeds available items (${collectable.length}), returning all items`);
      return collectable;
    }

    const randomItems = [...collectable].sort(() => Math.random() - 0.5).slice(0, count);
    logService(`Successfully retrieved ${randomItems.length} random items from ${collection}`);

    return randomItems;
  } catch (error) {
    logError(`Failed to get random items from ${collection}`, error, { count });
    throw error;
  }
}
