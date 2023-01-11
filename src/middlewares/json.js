export const json = async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    console.log("chunk", chunk);
    buffers.push(chunk);
  }

  console.log("buffers", buffers);

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
    console.log("body", req.body);
  } catch {
    req.body = null;
  }

  res.setHeader("Content-Type", "application/json");
};
