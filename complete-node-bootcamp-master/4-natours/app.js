const express = require("express");
const fs = require("fs");
const app = express();
const morgan = require("morgan");

app.use(express.json()); //middleware

app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("Hello from the middleware 😄");
  next();
});

app.use((req, res, next) => {
  req.requsetTime = new Date().toISOString();
  next();
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}.....`);
});

// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Hello from the server side",
//     app: "Natours",
//   });
// });

// app.post("/", (req, res) => {
//   res.send("You can post to this endpoint");
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/starter/dev-data/data/tours-simple.json`)
  // import("./starter/dev-data/data/tours-simple.json")
);

app.get("/api/v1/tours", (req, res) => {
  console.log(req.requsetTime);
  res.status(200).json({
    status: "success",
    results: tours.length,
    requestedAt: req.requsetTime,
    data: { tours },
  });
});

app.get("/api/v1/tours/:id", (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  // console.log(tour);
  if (tour) {
    res.status(200).json({
      status: "success",
      data: tour,
    });
  } else {
    res.status(404).json({
      status: "failed",
      message: "We could not find the tour with the given id",
    });
  }
});

app.post("/api/v1/tours", (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/starter/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: newTour,
      });
    }
  );
});

app.patch("/api/v1/tours/:id", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "<update tour here>",
    },
  });
});

app.delete("/api/v1/tours/:id", (req, res) => {
  res.status(200).json({
    status: "success",
  });
});
