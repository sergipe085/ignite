import { IncomingMessage, OutgoingMessage } from "node:http"

export async function json(req, res) {
    const chunks = [];

    for await (var chunk of req) {
        console.log(chunk)
        chunks.push(chunk);
    }
    try {
        req.body = JSON.parse(Buffer.concat(chunks).toString());
    }
    catch {
        req.body = null
    }
}