import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const db = new Database();

export const routes = [
    {
        method: "GET",
        path: buildRoutePath("/users"),
        handler: (req, res) => {
            const { search } = req.query;

            return res.setHeader("Content-type", "application/json").end(JSON.stringify(db.select("users", search ? {
                name: search,
                email: search
            } : null)));
        }
    },
    {
        method: "POST",
        path: buildRoutePath("/users"),
        handler: (req, res) => {
            const { name, email } = req.body;

            const insertedUser = db.insert("users", {
                name,
                email
            })
            
            return res.writeHead(201).end(JSON.stringify(insertedUser))
        }
    },
    {
        method: "PUT",
        path: buildRoutePath("/users/:id"),
        handler: (req, res) => {  
            const { id } = req.params;
            const { name, email } = req.body;

            db.update("users", id, {
                name,
                email
            });

            return res.writeHead(204).end();
        }
    },
    {
        method: "DELETE",
        path: buildRoutePath("/users/:id"),
        handler: (req, res) => {  
            const { id } = req.params;

            db.delete("users", id);

            return res.writeHead(204).end();
        }
    }
]