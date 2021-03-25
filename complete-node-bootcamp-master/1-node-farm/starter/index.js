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
  console.log(req);
  console.log(res);
  res.end("Hello from server!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});
