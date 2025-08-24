import { Hono } from "@hono/hono";
import {
  getCollection,
  getCollectionItemById,
  getHtml,
  getNumberRandomItems,
  getRandomCollectionItem,
} from "../controller/controller.ts";
import { routeLogger } from "../middlewares/logger.ts";
import { validateCollection, validateId, validateCount } from "../middlewares/validation.ts";
import { logRoute } from "../utils/logger.ts";

export function registerRoutes(app: Hono) {
  app.get("/", (c) => getHtml(c));

  // note: issue -> remember register specific routes first, then less specific after 
  ["colors", "words", "quotes"]
    .forEach((el) => {
      logRoute(`Registering routes for collection: ${el}`);

      // most specific routes first + validations
      app.get(`/${el}/random/:n`,
        validateCollection,
        validateCount,
        routeLogger(`${el}-random-count`),
        (c) => getNumberRandomItems(c)
      );

      app.get(`/${el}/random`,
        validateCollection,
        routeLogger(`${el}-random`),
        (c) => getRandomCollectionItem(c)
      );

      // then less specific routes
      app.get(`/${el}/:id`,
        validateCollection,
        validateId,
        routeLogger(`${el}-by-id`),
        (c) => getCollectionItemById(c)
      );

      app.get(`/${el}`,
        validateCollection,
        routeLogger(`${el}-all`),
        (c) => getCollection(c)
      );

      logRoute(`Routes registered for collection: ${el}`);
    });
}
