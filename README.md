
# 4-API Server

## How to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm run start
   ```
   OR

   ```bash
   node index.js
   ```

3. Visit [http://localhost:4040/](http://localhost:4040/) to view the API documentation.

```
---

The **4-API Server** provides simple endpoints for fetching **words**, **phrases**, and **colors**.  
It supports retrieving all items, random items, items by ID, and multiple random items.

---

## Endpoints

**Available Methods** 

 Routes for each collection (phrases, colors, words)
 --------------------------------------------------
 Each collection's get-method usage example:
 *  `GET  /<collection>`            → all items + count
 *  `GET  /<collection>/:id`         → one item by ID
 *  `GET  /<collection>/random`     → one random item
 *  `GET  /<collection>/random/:n`  → n random items + count

---------------------------------------------------

### 1. Words
- **Base URL**: `/words`
- **Description**: Fetch words along with their definition and grammatical figure.

**Available Methods**

- `GET /words` → Fetch all words  
- `GET /words/2` → Fetch a word where it's id = 2 
- `GET /words/random` → Fetch a random word  
- `GET /words/random/:5` → Fetch 5 random words  

**Sample Response**
```json
{
  "id": 1,
  "name": "phosphenes",
  "figure": "n.",
  "definition": "the colors or 'stars' you see when you rub your eyes"
}
````

---

### 2. Phrases

* **Base URL**: `/phrases`
* **Description**: Fetch inspirational quotes with authors.

**Available Methods**

* `GET /phrases` → Fetch all phrases
* `GET /phrases/random` → Fetch a random phrase
* `GET /phrases/:id` → Fetch a phrase by its ID
* `GET /phrases/random/:count` → Fetch a certain number of random phrases

**Sample Response**

```json
{
  "id": 1,
  "quote": "Dreaming, after all, is a form of planning",
  "author": "Gloria Steinem"
}
```

---

### 3. Colors

* **Base URL**: `/colors`
* **Description**: Fetch color pairs with background and text values.

**Available Methods**

* `GET /colors` → Fetch all colors
* `GET /colors/random` → Fetch a random color
* `GET /colors/:id` → Fetch a color by its ID
* `GET /colors/random/:count` → Fetch a certain number of random colors

**Sample Response**

```json
{
  "id": 1,
  "bg": "#f4f0ea",
  "color": "#544b43" 
}
```

---

## Usage

Make HTTP requests to the provided endpoints using your preferred client (e.g., `curl`, `Postman`, or in your frontend application).

Example:

```bash
# Fetch a random word
curl http://localhost:4040/words/random
```

---

## Project Structure

```
4-api-server/
├── public/
├── src/
  ├── config/         # app configs, db configs
  ├── controllers/    # route logic
  ├── middlewares/    # request validation, error handling
  ├── models/         # data models (file-based storage)
  ├── routes/         # API routes (mount controllers)
  ├── services/       # business logic (optional, for scaling)
  ├── utils/          # helpers
  └── app.js          # express app bootstrap
index.js             # entry point
```

---

## Project Structure
- `index.js` — Main server file (Express.js setup and route handling)
- `handler.js` — File system operations (reading, writing, initializing data file)
- `index.html` — API documentation page
- `data.json` — Data storage file (auto-created)

---

## Tech Stack

* **Node.js / Express.js**
* **JSON-based storage (or database integration if configured)**

---

## Quick Start

Clone the repository and install dependencies:

```bash
git clone https://github.com/MalindiFrank/4Api.git
cd 4api
npm install
npm start
```

Server will start locally at:

```
http://localhost:4040
```

---

## License

This project is licensed under the **MIT License**.frank@frank:~/Desktop/4a$ 
frank@frank:~/Desktop/4a$ cat README.md

# 4-API Server

## How to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm run start
   ```
   OR

   ```bash
   node index.js
   ```

3. Visit [http://localhost:4040/](http://localhost:4040/) to view the API documentation.

```
---

The **4-API Server** provides simple endpoints for fetching **words**, **phrases**, and **colors**.  
It supports retrieving all items, random items, items by ID, and multiple random items.

---

## Endpoints

**Available Methods** 

 Routes for each collection (phrases, colors, words)
 --------------------------------------------------
 Each collection's get-method usage example:
 *  `GET  /<collection>`            → all items + count
 *  `GET  /<collection>/:id`         → one item by ID
 *  `GET  /<collection>/random`     → one random item
 *  `GET  /<collection>/random/:n`  → n random items + count

---------------------------------------------------

### 1. Words
- **Base URL**: `/words`
- **Description**: Fetch words along with their definition and grammatical figure.

**Available Methods**

- `GET /words` → Fetch all words  
- `GET /words/2` → Fetch a word where it's id = 2 
- `GET /words/random` → Fetch a random word  
- `GET /words/random/:5` → Fetch 5 random words  

**Sample Response**
```json
{
  "id": 1,
  "name": "phosphenes",
  "figure": "n.",
  "definition": "the colors or 'stars' you see when you rub your eyes"
}
````

---

### 2. Phrases

* **Base URL**: `/phrases`
* **Description**: Fetch inspirational quotes with authors.

**Available Methods**

* `GET /phrases` → Fetch all phrases
* `GET /phrases/random` → Fetch a random phrase
* `GET /phrases/:id` → Fetch a phrase by its ID
* `GET /phrases/random/:count` → Fetch a certain number of random phrases

**Sample Response**

```json
{
  "id": 1,
  "quote": "Dreaming, after all, is a form of planning",
  "author": "Gloria Steinem"
}
```

---

### 3. Colors

* **Base URL**: `/colors`
* **Description**: Fetch color pairs with background and text values.

**Available Methods**

* `GET /colors` → Fetch all colors
* `GET /colors/random` → Fetch a random color
* `GET /colors/:id` → Fetch a color by its ID
* `GET /colors/random/:count` → Fetch a certain number of random colors

**Sample Response**

```json
{
  "id": 1,
  "bg": "#f4f0ea",
  "color": "#544b43" 
}
```

---

## Usage

Make HTTP requests to the provided endpoints using your preferred client (e.g., `curl`, `Postman`, or in your frontend application).

Example:

```bash
# Fetch a random word
curl http://localhost:4040/words/random
```

---

## Project Structure

```
4-api-server/
├── public/
├── src/
  ├── config/         # app configs, db configs
  ├── controllers/    # route logic
  ├── middlewares/    # request validation, error handling
  ├── models/         # data models (file-based storage)
  ├── routes/         # API routes (mount controllers)
  ├── services/       # business logic (optional, for scaling)
  ├── utils/          # helpers
  └── app.js          # express app bootstrap
index.js             # entry point
```

---

## Project Structure
- `index.js` — Main server file (Express.js setup and route handling)
- `handler.js` — File system operations (reading, writing, initializing data file)
- `index.html` — API documentation page
- `data.json` — Data storage file (auto-created)

---

## Tech Stack

* **Node.js / Express.js**
* **JSON-based storage (or database integration if configured)**

---

## Quick Start

Clone the repository and install dependencies:

```bash
git clone https://github.com/MalindiFrank/4Api.git
cd 4api
npm install
npm start
```

Server will start locally at:

```
http://localhost:4040
```

---

## License

This project is licensed under the **MIT License**.
---
