const http = require("http");

const products = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
  },
  {
    id: 5,
    title:
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
  },
];

const server = http.createServer((req, res) => {
  console.log(`${req.method} -> Request`);

  console.log(`Token: ${req.headers.authorization}`);

  var resStatus = 404;
  var resHeaders = {
    "Content-Type": "application/json",
    "X-Powered-By": "Node-Http",
  };
  var response = {
    success: false,
    data: null,
    error: null,
  };
  var body = [];

  //   =============== << Getting Request Body >> ===================
  //   ==============================================================

  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      console.log("Request Body: ", body);

      const { method, url } = req;

      if (method === "GET" && url === "/products") {
        resStatus = 200;
        response.success = true;
        response.data = products;
      } else if (method === "POST" && url === "/products") {
        const { id, title, price } = JSON.parse(body);

        if (!id || !title || !price) {
          resStatus = 400;
          response.error = "Please submit all the required fields!";
        } else {
          products.push({ id, title, price });
          resStatus = 201;
          response.success = true;
          response.data = products;
        }
      }

      res.writeHead(resStatus, resHeaders);

      //   =============== << Sending Back Response >> ==================
      //   ==============================================================

      res.end(JSON.stringify(response));
    });
});

const PORT = 5500;

server.listen(PORT, console.log(`Server Running on Port: ${PORT}`));
