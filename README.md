## **4-API Server**

Visit [- fourapi -](https://fourapi.onrender.com) to view the API documentation.

A light REST API built with Deno & Hono that serves curated collections of `words`, `quotes`, and `colors`. For developers building creative apps, learning projects, or needing quick access to inspiring content, prototypes, or adding some personality to your next project! Simply provides endpoints for fetching `words`, `quotes`, and `color pallets`. It supports retrieving all items, random items, items by ID, and multiple random items.


**Quick Try - On The Terminal:**

```bash
# Get a random inspirational quote
curl https://fourapi.onrender.com/quotes/random

# Fetch 2 random color palettes
curl https://fourapi.onrender.com/colors/random/2
```

### Quick Start Run

```bash
git clone https://github.com/MalindiFrank/4api.git
cd 4api
deno task dev
```
`deno task dev` or `docker run -p 4040:4040 --rm 4-api-server`

Visit [http://localhost:4040/](http://localhost:4040/) to view the API documentation.

---

### Docker

1. Build the Docker image:
   ```bash
   docker build -t 4-api-server .
   ```

2. Run the container:
   ```bash
   docker run -p 4040:4040 --rm --name 4-api 4-api-server
   ```

3. Visit [http://localhost:4040/](http://localhost:4040/) to access the API.

---

## Endpoints

**Available Methods + Routes for each collection (quotes, colors, words)**

Each collection's get-method usage example:

- `GET  /<collection>` → all items + count
- `GET  /<collection>/:id` → one item by ID
- `GET  /<collection>/random` → one random item
- `GET  /<collection>/random/:n` → n random items + count

---

### 1. Words

- **Base URL**: `/words`
- **Description**: Fetch words along with their definition and grammatical figure.

**Available Methods**

- `GET /words` → Fetch all words
- `GET /words/2` → Fetch a word where it's id = 2
- `GET /words/random` → Fetch a random word
- `GET /words/random/5` → Fetch 5 random words

**Sample Response**

```json
{
  "status": "OK",
  "data": [
    {
      "id": 1,
      "name": "phosphenes",
      "figure": "n.",
      "definition": "the colors or 'stars' you see when you rub your eyes"
    }
  ]
}

```

---

### 2. Quotes

- **Base URL**: `/quotes`
- **Description**: Fetch inspirational quotes with authors.

**Available Methods**

- `GET /quotes` → Fetch all quotes
- `GET /quotes/random` → Fetch a random quote
- `GET /quotes/:id` → Fetch a quote by its ID
- `GET /quotes/random/:count` → Fetch a certain number of random quotes

**Sample Response**

```json
{
  "status": "OK",
  "data": [
    {
      "id": 1,
      "quote": "Dreaming, after all, is a form of planning",
      "author": "Gloria Steinem"
    }
  ]
}
```

---

### 3. Colors

- **Base URL**: `/colors`
- **Description**: Fetch color pairs with background and text values.

**Available Methods**

- `GET /colors` → Fetch all colors
- `GET /colors/random` → Fetch a random color
- `GET /colors/:id` → Fetch a color by its ID
- `GET /colors/random/:count` → Fetch a certain number of random colors

**Sample Response**

```json
{
  "status": "OK",
  "data": [
    {
      "id": 1,
      "bg": "#f4f0ea",
      "color": "#544b43"
    }
  ]
}
```

## Project Structure

```
4-api-server/
├── public/
│   └── index.html
├── src/
│   ├── app.ts          # Hono app bootstrap
│   ├── controller/     # route logic
│   ├── middlewares/    # request validation, error handling
│   ├── models/         # data models (TypeScript interfaces)
│   ├── routes/         # API routes (mount controllers)
│   ├── services/       # business logic
│   ├── utils/          # helpers
│   └── db/             # JSON data storage files
├── tests/
├── main.ts             # entry point
└── deno.json           # Deno configuration
```

---

## Tech Stack

- `Deno Runtime` - `Hono Framework` - `TypeScript` - `JSON-based storage`

---

##### License - This project is licensed under the **MIT License**.
