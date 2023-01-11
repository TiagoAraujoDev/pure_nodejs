import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunk, _, callback) {
    const transformed = parseInt(chunk.toString()) * -1;
    const buf = Buffer.from(transformed.toString());

    console.log(transformed);

    callback(null, buf);
  }
}

const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (let chunk of req) {
    console.log("chunk", chunk);
    buffers.push(chunk);
    console.log("buffers", buffers);
  }

  const BufConcat = Buffer.concat(buffers);
  console.log("BufConcat", BufConcat);

  const fullStreamContent = BufConcat.toString();
  console.log(fullStreamContent);

  return res.end(fullStreamContent);
});

server.listen(3333);
