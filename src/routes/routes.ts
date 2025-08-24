import app from "../app.ts"
import { getHtml, getJson } from "../controller/controller.ts";


app.get("/", (c) => getHtml(c))

app.get("/json", (c) => getJson(c))


