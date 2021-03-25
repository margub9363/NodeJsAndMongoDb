const fs = require("fs");
const http = require("http");

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
const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/") {
    res.end("Hello from server!");
  } else if (pathName === "/overview") {
    res.end("This is the overview Page");
  } else if (pathName === "/product") {
    res.end("This is the product page");
  } else if (pathName === "/api") {
    fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data4) => {
      const textFileContent = JSON.parse(data4);
      console.log(textFileContent);
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(data4);
    });
    // res.end("Api");
  } else {
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
