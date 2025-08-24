import { Context } from "@hono/hono";

export async function getHtml(c: Context): Promise<Response> {
  const html = await Deno.readTextFile("../../public/index.html");
  return c.html(html);
}

export function getCollection(c: Context): Response {
  const collectables: Array<cType> = getCollectionArray(c.req.param("collection"));

  return c.json({
    status: "OK",
    length: collectables.length.toString(),
    data: collectables,
  });
}

export function getCollectionItemById(c: Context): Response {

  const { collection, id } = c.req.param();
  const collectables: object<cType> = getItemById(collection, Number.parseInt(id));

  return c.json({
    status: "OK",
    data: collectables,
  });
}

export function getRandomCollectionItem(c: Context): Response {
  const collectables: object<cType> = getRandomItem(c.req.param("collection"));

  return c.json({
    status: "OK",
    data: collectables,
  });
}

export function getNumberRandomItems(c: Context): Response {

  const { collection, n } = c.req.param();
  const collectables: object<cType> = getRandomItems(collection, Number.parseInt(n));

  return c.json({
    status: "OK",
    length: collectables.length.toString(),
    data: collectables,
  });
}
