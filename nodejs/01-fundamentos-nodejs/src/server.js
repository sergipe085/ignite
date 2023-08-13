import http from "http"

const users = []

const httpServer = http.createServer(async (req, res) => {
    const { url, method } = req;

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

    if (method == "GET" && url == "/users") {
        return res.setHeader("Content-type", "application/json").end(JSON.stringify(users));
    }

    if (method == "POST" && url == "/users") {
        const { name, email } = req.body;

        users.push({
            id: users.length + 1,
            name,
            email
        })
        
        return res.writeHead(201).end()
    }
    
    return res.writeHead(404).end();
})

httpServer.listen(3333, () => {
    console.log("server listennign on http://127.0.0.1:3333")
});