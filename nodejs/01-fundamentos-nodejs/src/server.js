import http from "http"

const users = []

const httpServer = http.createServer((req, res) => {
    const { url, method } = req;

    if (method == "GET" && url == "/users") {
        return res.setHeader("Content-type", "application/json").end(JSON.stringify(users));
    }

    if (method == "POST" && url == "/users") {
        users.push({
            id: 1,
            name: "podinha",
            endereco: {
                rua: "Rua marcelo gentil porto",
                bairro: "Luciano cavalcante"
            }
        })
        
        return res.writeHead(201).end()
    }
    
    return res.writeHead(404).end();
})

httpServer.listen(3333, () => {
    console.log("server listennign on http://127.0.0.1:3333")
});