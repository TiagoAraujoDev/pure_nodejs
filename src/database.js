import fsPromises from "node:fs/promises";
import fs from "node:fs";
import path from "node:path";

const fullpath = new URL("../database/db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    this.#databaseConn();
  }

  async #databaseConn() {
    if (!fs.existsSync(path.join(fullpath.pathname, ".."))) {
      await fsPromises.mkdir(path.join(fullpath.pathname, ".."));
    }

    try {
      const data = await fsPromises.readFile(fullpath, {
        encoding: "utf8",
      });
      this.#database = JSON.parse(data);
    } catch (error) {
      this.#persist();
    }
  }

  #persist() {
    fsPromises.writeFile(fullpath.pathname, JSON.stringify(this.#database));
  }

  select(table) {
    const data = this.#database[table] ?? [];

    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }
}
