const replaceTemplate = require("./module/replaceTemplate");
const fs = require("fs");
const http = require("http");
const url = require("url");

// Synchronous read/write (Blocking code)
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about avacado: ${textIn} \nCreated on ${Date()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File has been created");

// Asynchronous read/write , Non-Blocking codes
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   console.log(data1);
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/start.txt", "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile(
//         "./txt/final.txt",
//         `${data2}\n\n ${data3}`,
//         "utf-8",
//         (err) => {
//           console.log("Your file has been written");
//         }
//       );
//     });
//   });
// });
// console.log("Will Read a file!");

// Server

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
console.log(tempCard);

const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
// console.log(tempProduct);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
// console.log(dataObj);

const server = http.createServer((req, res) => {
  // console.log(req);
  const { query, pathname } = url.parse(req.url, true);
  // const pathname = req.url;
  // Overview Page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCTCARDS%}", cardsHtml);
    res.end(output);
  }
  //  Product Page
  else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    console.log(query);
    res.end(output);
  }
  // Api Page
  else if (pathname === "/api") {
    fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data4) => {
      const textFileContent = JSON.parse(data4);
      console.log(textFileContent);
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(tempOverview);
    });
  }
  // Not Found
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});
