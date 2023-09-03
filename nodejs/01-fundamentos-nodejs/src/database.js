import { randomUUID } from "node:crypto";
import { readFile, writeFile } from "node:fs"

const databasePath = new URL("../db.json", import.meta.url)

export class Database {
    #database = {}

    constructor() {
        this.#load();
    }

    #persist() {
        writeFile(databasePath, JSON.stringify(this.#database), (err) => {
            console.log(err)
        })
    }

    #load() {
        readFile(databasePath, (err, data) => {
            if (err) {
                this.#persist();
                return;
            }

            this.#database = JSON.parse(data.toString());
        });
    }

    select(table, search) {
        let data = this.#database[table] ?? []

        if (search) {
            data = data.filter((row) => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase());
                })
            })
        }

        return data;
    }

    insert(table, data) {
        const id = randomUUID();
        if (Array.isArray(this.#database[table])) {
            const insertedData = { id, ...data }
            this.#database[table].push(insertedData)
            this.#persist()
            return insertedData;
        }
        else {
            const insertedData = { id, ...data}
            this.#database[table] = [insertedData]
            this.#persist()
            return insertedData;
        }
        
    }

    delete(table, index) {
        const rowIndex = this.#database[table].findIndex(row => row.id == index);

        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1);
            this.#persist();
        }
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id == id);

        if (rowIndex > -1) {
            this.#database[table][rowIndex] = { id, ...data };
            this.#persist();
        }
    }
}