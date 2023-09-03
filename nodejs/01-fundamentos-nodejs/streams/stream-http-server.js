import http from "http"
import { Transform } from "node:stream"

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1;

        console.log(transformed)

        callback(null, Buffer.from(transformed.toString()));
    }
}

const httpServer = http.createServer(async (req, res) => {
    const chunks = [];

    for await (var chunk of req) {
        console.log(chunk)
        chunks.push(chunk);
    }
    const fullStreamContent = Buffer.concat(chunks).toString();

    console.log(fullStreamContent);
    

    // console.log(res);

    return res.end(fullStreamContent);
})

httpServer.listen(3334, () => {
    console.log("server listennign on 127.0.0.1:3334")
});