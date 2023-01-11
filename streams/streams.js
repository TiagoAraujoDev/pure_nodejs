import { Readable, Transform, Writable } from "node:stream";

class OneToTenStream extends Readable {
  index = 1;
  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 10) {
        this.push(null);
      } else {
        const buf = Buffer.from(i.toString());

        this.push(buf);
      }
    }, 1000);
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, _, callback) {
    const transformed = parseInt(chunk.toString()) * -1;
    const buf = Buffer.from(transformed.toString())

    callback(null, buf)
  }
}

class TenTimesStream extends Writable {
  _write(chunk, _, callback) {
    console.log(parseInt(chunk.toString()) * 10);
    callback();
  }
}

new OneToTenStream()
  .pipe(new InverseNumberStream())
  .pipe(new TenTimesStream())
