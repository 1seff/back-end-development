// app.js

const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

// Using POST METHOD. Listens for endpoint "/save" then runs a function that creates a user with email and name.
app.post("/save", async (req, res) => {
  const { email, name } = req.body;
  const user = await prisma.user.create({
    data: {
      email,
      name,
    },
  });
  res.json({ user });
});

// USING GET METHOD. Retrieves all users without any filters and returns it.
app.get("/users", async (req, res) => {
  const userMany = await prisma.user.findMany(); // Find multiple entries.
  res.json({ userMany });
});

// USING POST METHOD. Retrieves one account with filter using email and returns it.
app.post("/user-one", async (req, res) => {
  const { email, name } = req.body;
  const userOne = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  res.json({ userOne });
});

// USING PUT METHOD. Updating an account using account id then returns an old and new email.
app.put("/user-one/:id", async (req, res) => {
  const { email, name } = req.body;
  const id = req.params.id;

  const oldAccount = await prisma.user.findFirst({
    where: {
      id: Number(id),
    },
  });

  const newAccount = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      email: email,
    },
  });
  res.json({ oldEmail: oldAccount.email, newEmail: newAccount.email });
});

// USING DELETE METHOD. Returns data containing string Hello World.
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  const oldAccount = await prisma.user.findFirst({
    where: {
      id: Number(id),
    },
  });

  const deleteObject = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });

  res.json({
    account: oldAccount,
    message: deleteObject
      ? "Deleted succesfully."
      : "Error! No entry to delete.",
  });
});

// USING GET METHOD. Returns a dynamic data based on query variable 'sample'.
app.get("/request", async (req, res) => {
  const { sample } = req.query;
  res.json({ data: sample });
});

// USING POST METHOD. Returns a dynamic data based on body variable 'sample'.
app.post("/request", async (req, res) => {
  const { sample } = req.body;
  res.json({ data: sample });
});

// Run our simple server app listening on localhost port 3000 (localhost:3000)
// then runs a function that shows a success message.
const server = app.listen(3000, () => {
  console.log("App running is successfully.");
});

// NOTE! For every changes in app.js, re-run the server app by shutting down
// the running app first if any, then execute command line 'node app.js' to run
// latest code changes. Before executing the command line, make sure that your
// terminal(linux or mac) or command prompt's(windows) current directory is where
// your back-end directory located(E.g. C:\Users\<PC Username>\Desktop\front-end-development).
