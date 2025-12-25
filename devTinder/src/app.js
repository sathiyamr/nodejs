const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

// Overall these are the middle wares and finally somehting gives the response right that is called response handler

app.get("/users", userAuth, (req, res, next) => {
  console.log("Request Handler - 1");
  next();
});

app.get("/users", (req, res, next) => {
  console.log("Request Handler - 2");
  res.send("Handles GET methods of users from the handlers 2");
});

app.use("/admin", adminAuth);

// app.use("/admin", (req, res, next) => {
//   const token = "xyz";
//   const isAuthorizedToken = token === "xyz";
//   if (!isAuthorizedToken) {
//     res.status(401).send("Unauthorized request");
//   } else {
//     next();
//   }
// });

app.get("/admin/getAllData", (req, res, next) => {
  res.send("Admin Data returned Entirely");
});

app.get("/admin/deleteAllData", (req, res, next) => {
  res.send("Admin Data deleted Entirely");
});

// app.get(
//   "/users",
//   (req, res, next) => {
//     console.log("Caution: If multiple res.send then will lead to error ");
//     console.log("Consider next() is called by no handler function will lead to error  ");
//     console.log("If no res.send also will lead to error ");

//     console.log("Request Handler 1 -- Order 1");
//     next();
//     // res.send("Handles ALL methods, but exact route");
//   },
//   (req, res, next) => {
//     console.log("Request Handler 2 -- Order 2");
//     next();
//     // res.send("Handles ALL methods, but exact route");
//   },
//   (req, res, next) => {
//     next();
//     console.log("Request Handler 4 -- Order 5");
//     // res.send("Handles ALL methods, but exact route");
//   },
//   (req, res, next) => {
//     next();
//     console.log("Request Handler 5 -- Order 4");
//     // res.send("Handles ALL methods, but exact route");
//   },
//   (req, res, next) => {
//     console.log("Request Handler 6 -- Order 3");
//     res.send("Handles GET methods of users");
//   }
// );

// app.all("/net", (req, res) => {
//   res.send("Handles ALL methods, but exact route");
// })

// app.get("/", (req, res) => {
//   res.send("Hello from the server!!!");
// });

// app.get("/test", (req, res) => {
//   res.send("TEST path from the server!!!");
// });

// app.get("/home", (req, res) => {
//   res.send("HOME path from the server!!!");
// });

// app.get("/user", (req, res) => {
//   res.send({username: "Sathiya", firstname: "Moorthy"});
// });

// app.get(/.*fly/, (req, res) => {
//   res.send("Matched fly");
// });

// app.use("/network", (req, res) => {
//   res.send("Network from the server!!!");
// });

app.use("/", (req, res) => {
  res.send("Works for ALL HTTP methods, Matches prefix, this is default one ");
});

app.listen(3000, () => {
  console.log("My app server is listening port number 3000.....");
});
