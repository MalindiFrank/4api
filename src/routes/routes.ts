import app from "../app.ts"
import { getHtml, getCollection, getCollectionItemById, getRandomCollectionItem, getNumberRandomItems } from "../controller/controller.ts";


app.get("/", (c) => getHtml(c))
app.get("/:collection", (c) => getCollection(c))
app.get("/:collection/:id", (c) => getCollectionItemById(c))
app.get("/:collection/random", (c) => getRandomCollectionItem(c))
app.get("/:collection/random/:n", (c) => getNumberRandomItems(c))


