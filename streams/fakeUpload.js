import { Duplex } from "node:stream";

class OneToTenStream extends Duplex {
  index = 1;
  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 5) {
        this.push(null);
      } else {
        const buf = Buffer.from(i.toString());

        this.push(buf);
      }
    }, 1000);
  }
}

const body = new OneToTenStream();

fetch("http://localhost:3333", {
  method: "POST",
  body,
})
  .then((Response) => {
    return Response.text();
  })
  .then((data) => {
    console.log(data);
  });
