import http from "http"
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

const httpServer = http.createServer(async (req, res) => {
    const { url, method } = req;

    await json(req, res);

    const route = routes.find(route => {
        return route.method == method && route.path.test(url);
    })

    if (route) {
        const routeParams = url.match(route.path);

        const { query, ...params } = routeParams.groups;

        req.params = params;
        req.query = query ? extractQueryParams(query) : {};

        return route.handler(req, res);
    }
    
    return res.writeHead(404).end();
})

httpServer.listen(3333, () => {
    console.log("server listennign on http://127.0.0.1:3333")
});